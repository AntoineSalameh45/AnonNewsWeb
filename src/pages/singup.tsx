import { useDispatch } from "react-redux";
import AppHeader from "../components/Organisms/AppHeader";
import SignupForm from "../components/Molecules/SignupForm";
import { AppDispatch } from "../store";
import { signup } from "../store/user/userSlice";

const SignUp = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleSignup = async (email: string, password: string, token_expires_in: string | undefined) => {
        try {
            await dispatch(signup({email, password, token_expires_in}));
            window.location.href = "/";
        } catch (error) {
            console.error("An error occurred while creating your account:", error);
        }
    };

    const bgimg = 'src/assets/bg/img4.jpg';
    
    return (
        <>
            <div
                className="bg-local h-[100vh] w-[100vw] bg-cover bg-center" 
                style={{ backgroundImage: `url(${bgimg})` }}
            >
                <AppHeader />
                <hr/>
                <div></div>
                <div className="bg-[#E5E7EB] flex m-4 rounded-xl">
                    <SignupForm handleSignup={handleSignup}/>
                </div>
            </div>
        </>
    );
};

export default SignUp;
