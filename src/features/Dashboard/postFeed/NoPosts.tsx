import DashboardPage from '../../../ui/DashboardPage'


const NoPosts = () => {
  return (
    <DashboardPage>
    <div className="flex flex-col items-center justify-center h-full p-6 text-center ">
      <p className="text-lg font-semibold text-gray-700">
        Your feed is currently empty.
      </p>
      <p className="mt-2 text-gray-500">
        You haven't followed any users or joined any groups yet. Start
        exploring and following others to see posts here!
      </p>
    </div>
  </DashboardPage>
  )
}

export default NoPosts