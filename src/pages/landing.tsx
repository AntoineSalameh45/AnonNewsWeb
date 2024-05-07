import AppHeader from "../components/Organisms/AppHeader";
import LoginForm from "../components/Molecules/LoginForm";
import { login } from "../store/user/userSlice";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";

const Landing = () => {
    const dispatch: AppDispatch = useDispatch();
    const handleLogin = (email: string, password: string, token_expires_in: string | undefined) => {

    dispatch(login({email, password, token_expires_in}))
}
    const bgimg = 'src/assets/bg/img4.jpg';
    return (
        <>
            <div
            className="bg-local h-[100vh] w-[100vw] bg-cover bg-center" 
            style={{ backgroundImage: `url(${bgimg})` }}
            >
                <AppHeader showLogoutButton={false} />
                <hr/>
                <div className="bg-[#E5E7EB] m-4 rounded-xl">
                    <LoginForm handleLogin={handleLogin}/>
                </div>
            </div>
        </>
  );
};
export default Landing