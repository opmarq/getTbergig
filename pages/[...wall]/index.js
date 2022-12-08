import { useRouter } from "next/router";

const Wall = () => {
  const { query } = useRouter();
  console.log(query);
  return <p>wall</p>;
};

export default Wall;
