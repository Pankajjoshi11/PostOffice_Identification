import PostApi from "../components/PostApi";
// initialising dev branch 

const Main: React.FC = () => {
  const [sendSms, setSendSms] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1>Main</h1>
      < PostApi/>
    </div>
  );
};

export default Main;
