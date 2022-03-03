import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Import modules
import EditBlog from 'components/Admin/Blog/EditBlog';
import Certificates from 'components/Admin/Certificate/Certificates';
import CreateDisease from 'components/Admin/Disease/CreateDisease';
import EditDisease from 'components/Admin/Disease/EditDisease';
import CreateDoctor from 'components/Admin/Doctor/CreateDoctor';
import EditDoctor from 'components/Admin/Doctor/EditDoctor';
import CreateHospital from 'components/Admin/Hospital/CreateHospital';
import EditHospital from 'components/Admin/Hospital/EditHospital';
import CreateSpeciality from 'components/Admin/Speciality/CreateSpeciality';
import EditSpeciality from 'components/Admin/Speciality/EditSpeciality';
import Specialities from 'components/Admin/Speciality/Specialities';
import Certificate from 'components/Admin/Certificate/Certificate';
import Loading from 'components/Global/Loading';
import Timeslots from 'components/Admin/Timeslot/Timeslots';
import CreateTimeslot from 'components/Admin/Timeslot/CreateTimeslot';


const Client = React.lazy(() => import(`components/Client`));
const Home = React.lazy(() => import(`components/Home`));
const Registration = React.lazy(() => import(`components/Registration/Registration`));
const Diseases = React.lazy(() => import(`components/Diseases`));
const Disease = React.lazy(() => import(`components/Diseases/Disease`));
const DiseasesAdmin = React.lazy(() => import("components/Admin/Disease/Diseases"));
const UserCalendar = React.lazy(() => import('components/User/UserCalendar'));
const UserProfile = React.lazy(() => import(`./components/User/UserProfile`));
const UpdateProfile = React.lazy(() => import(`./components/User/UpdateProfile`));
const DocProfile = React.lazy(() => import('components/Doc/DocProfile'));
const DocCalendar = React.lazy(() => import(`./components/Doc/DocCalendar`));
const DocUpdateProfile = React.lazy(() => import(`./components/Doc/DocUpdateProfile`));
const Doctors = React.lazy(() => import(`components/Doctors`));
const Doctor = React.lazy(() => import('components/Doctors/Doctor'));
const DoctorsAdmin = React.lazy(() => import('components/Admin/Doctor/Doctors'));
const Blog = React.lazy(() => import(`components/Blog`));
const Logout = React.lazy(() => import(`components/Global/Logout`));
const HospitalsAdmin = React.lazy(() => import(`components/Admin/Hospital/Hospitals`));
const Hospitals = React.lazy(() => import(`components/Hospitals`));
const Hospital = React.lazy(() => import(`components/Hospitals/Hospital`));
const BlogsAdmin = React.lazy(() => import(`components/Admin/Blog/Blogs`));
const CreateBlog = React.lazy(() => import(`components/Admin/Blog/CreateBlog`));
const Dashboard = React.lazy(() => import(`components/Admin/Dashboard`));


function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Registration />} />
            <Route path="/" element={<Client />} >
              <Route path="" element={<Home />} />
              <Route path="user" element={<UserProfile />} />
              <Route path="user/calendar" element={<UserCalendar />} />
              <Route path="user/update" element={<UpdateProfile />} />
              <Route path="doc" element={<DocProfile />} />
              <Route path="doc/calendar" element={<DocCalendar />} />
              <Route path="doc/update" element={<DocUpdateProfile />} />
              <Route path="blogs/:id" element={<Blog />} />
              <Route path="diseases" element={<Diseases />} />
              <Route path="diseases/:id" element={<Disease />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="doctors/:id" element={<Doctor />} />
              <Route path="hospitals" element={<Hospitals />} />
              <Route path="hospitals/:id" element={<Hospital />} />
            </Route>
            <Route path="/admin" element={<Dashboard />}>
              <Route path="doctors" element={<DoctorsAdmin />} />
              <Route
                path="doctors/:id/edit"
                element={<EditDoctor />}
              />
              <Route
                path="doctors/create"
                element={<CreateDoctor />}
              />
              <Route path="diseases" element={<DiseasesAdmin />} />
              <Route
                path="diseases/:id/edit"
                element={<EditDisease />}
              />
              <Route
                path="diseases/create"
                element={<CreateDisease />}
              />
              <Route path="hospitals" element={<HospitalsAdmin />} />
              <Route
                path="hospitals/:id/edit"
                element={<EditHospital />}
              />
              <Route
                path="hospitals/create"
                element={<CreateHospital />}
              />
              <Route path="blogs" element={<BlogsAdmin />} />
              <Route path="blogs/:id/edit" element={<EditBlog />} />
              <Route path="blogs/create" element={<CreateBlog />} />
              <Route path="certificates" element={<Certificates />} />
              <Route
                path="certificates/:id"
                element={<Certificate />}
              />
              <Route path="specialities" element={<Specialities />} />
              <Route
                path="specialities/:id/edit"
                element={<EditSpeciality />}
              />
              <Route
                path="specialities/create"
                element={<CreateSpeciality />}
              />
              <Route path="timeslots" element={<Timeslots />} />
              <Route
                path="timeslots/create"
                element={<CreateTimeslot />}
              />
            </Route>
            <Route exact path="logout" element={<Logout />} />
          </Routes>

        </Router >
      </Suspense>
    </div >
  )
}

export default App;
