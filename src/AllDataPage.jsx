import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchDatas } from "./reduxtool/datasSlice";

const AllDataPage = () => {
  const dispatch = useDispatch();

  // 🔥 Correct selector (store → datas)
  const { data, loading, error } = useSelector((state) => state.datas);

  useEffect(() => {
    dispatch(fetchDatas()); // 🔥 Correct thunk
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>All Videos</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default AllDataPage;
