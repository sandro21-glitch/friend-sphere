import { useLocation } from "react-router-dom";

const SingleComunityPage = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  return (
    <section className="col-span-2 min-h-full h-full mt-5">
      SingleComunityPage
    </section>
  );
};

export default SingleComunityPage;
