import { Header, Sidebar, Timeline } from '../components'

const Dashboard = () => {
  return (
    <div className="bg-gray-50">
      <Header/>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  )
}
export default Dashboard
