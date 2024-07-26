import { CiLocationOn } from 'react-icons/ci'

type UserIntroductionTypes = {
    name:string,
    location:string,
}

const UserIntroduction = ({location,name}:UserIntroductionTypes) => {
  return (
    <div className="flex items-center flex-col">
    <h3 className="text-lg font-semibold">{name}</h3>
    <h6 className="flex items-center text-gray-500">
      <CiLocationOn />{" "}
      {location ? location : <span className="text-sm">N/A</span>}
    </h6>
  </div>
  )
}

export default UserIntroduction