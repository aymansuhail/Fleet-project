import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@windmill/react-ui';
import { LuClock } from 'react-icons/lu';
import { tableData } from '../lib/data';
import { behaviorData } from '../lib/driverBehavour';
import { recentTripsData } from '../lib/recenttrip';
import upcomingTripsData from '../lib/upComingTrips';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

export default function Drivers() {
  return (
    <div className="flex flex-col">
      <DriverTitle name="John" />
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 mb-4 md:mr-4 md:mb-0">
          <DriverProfile data={tableData[0]} />
          <div className="mt-4">
            <DriverBehaviorTable data={behaviorData[0]} />
          </div>
        </div>
        <div className="flex-1">
          <UpcomingTripsTable upcomingTripsData={upcomingTripsData} />
          <div className="mt-4">
            <RecentTripsTable data={recentTripsData} />
          </div>
        </div>
      </div>
    </div>
  );
}

const DriverTitle = ({ name }) => {
  return (
    <div className="text-2xl font-semibold mb-4">
      Driver &gt; {name}
    </div>
  );
};

const DriverProfile = ({ data }) => {
  const constantCategories = [
    'Driver Score',
    'Phone',
    'Vehicle Assigned',
    'CDL',
    'Miles Traveled',
  ];

  return (
    <TableContainer className=":w-[50%]">
      <Table>
        <TableBody>
          {data['Avatar'] && (
            <TableRow key="avatar">
              <TableCell colSpan={2}>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-row" style={{ marginRight: '10px' }}>
                    <img
                      src={data['Avatar']}
                      alt={data['Name']}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                      }}
                    />
                    <span className="font-semibold ml-2">{data['Name']}</span>
                  </div>
                  <span className="font-semibold ml-2 border text-green-600 border-green-600 rounded-3xl px-3 py-0 flex items-center">
                    <LuClock className="w-4 h-4 mr-2 text-green-500 font-bold" />
                    {data['AvatarValue']}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
          {constantCategories.map((category, index) => (
            <TableRow key={index}>
              <TableCell colSpan={2}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold ml-2">{category}</span>
                  {category === 'Driver Score' ? (
                    <span className="font-semibold ml-2">{data[category]}</span>
                  ) : (
                    <span className="font-semibold ml-2">
                      {data[category] || 'N/A'}
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const DriverBehaviorTable = ({ data }) => {
  const behaviorCategories = [
    'Fuel Economy',
    'Harsh Acceleration',
    'Harsh Braking',
    'Speed Limit Exceeded',
    'Idling Rate',
  ];

  return (
    <TableContainer className="w-[50%]">
      <Table>
        <TableBody>
          <TableRow key="driverBehavior">
            <TableCell colSpan={2}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold ml-2">
                  {data['Driver Behavior']}
                </span>
                <span className="font-semibold ml-2 cursor-pointer underline text-blue-400">
                  View All
                </span>
              </div>
            </TableCell>
          </TableRow>
          {behaviorCategories.map((category, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold ml-2">{category}</span>
                  {data[category] !== undefined ? (
                    <span
                      className={`font-semibold ml-2 ${
                        typeof data[category] === 'number'
                          ? data[category] > 5
                            ? 'text-red-500'
                            : 'text-yellow-500'
                          : ''
                      }`}
                    >
                      {typeof data[category] === 'number'
                        ? `${data[category]} times`
                        : data[category]}
                    </span>
                  ) : (
                    <span className="font-semibold ml-2">N/A</span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const RecentTripsTable = ({ data }) => {
  return (
    <TableContainer className="w-[50%]">
      <Table>
        <TableBody>
          <TableRow key="recentTrips">
            <TableCell colSpan={2}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold ml-2">Recent Trips</span>
                <span className="font-semibold ml-2 cursor-pointer underline text-blue-400">
                  View All
                </span>
              </div>
            </TableCell>
          </TableRow>
          {data.map((trip, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold ml-2">{trip.Place}</span>
                  <span
                    className={`font-semibold ml-2 ${
                      trip.Status === 'Completed'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {trip.Status}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const UpcomingTripsTable = ({ upcomingTripsData }) => {
  return (
    <TableContainer className="w-[50%]">
      <Table>
        <TableBody>
          <TableRow key="upcomingTrip">
            <TableCell colSpan={2}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold ml-2">Upcoming Trip</span>
                <span className="font-semibold">
                  {upcomingTripsData.location}
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="distance">
            <TableCell>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold ml-2">Distance</span>
                <span className="font-semibold">
                  {upcomingTripsData.distance}
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="arrivalTime">
            <TableCell>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold ml-2">Arrival Time</span>
                <span className="font-semibold">
                  {upcomingTripsData.dateTime}
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="map">
            <TableCell colSpan={2}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold ml-2">Map</span>
                <div
                  style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: '#f0f0f0',
                    textAlign: 'center',
                  }}
                >
                  {/* Placeholder for Map - Replace with your map implementation */}
                  <img
                    src="../images/user-36-01.jpg"
                    alt="Map"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="planTripButton">
            <TableCell colSpan={2}>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={() => alert('Plan a Trip button clicked')}
                >
                  Plan a Trip
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
