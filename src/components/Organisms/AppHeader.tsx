import LogoutButton from "../Atoms/LogoutButton";
import TodayDate from "../Atoms/TodayDate";

const AppHeader = () => {
  
    return (
      <>
        <div className="w-full flex items-center justify-center">
          <img src="/anon.png" alt="Anonymous logo" className="h-16" />
          <TodayDate />
          <LogoutButton />
        </div>
      </>
    );
  };
  
  export default AppHeader;