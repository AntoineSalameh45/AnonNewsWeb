import { useState } from "react";

interface iSignUpProps {
  handleSignup: (email: string, password: string, token_expires_in: string | undefined) => void;
}

const SignupForm = ({ handleSignup }: iSignUpProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await handleSignup(email, password, '30m');
    } catch (error) {
      console.error("An error occurred while creating your account:", error);
    } finally {
      setLoading(false);
    }
  };


    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to AnonNews.
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleEmail}
                    required
                    className="bg-white block w-full rounded-md border-0 p-1.5 text-[#950101aa] shadow-sm ring-1 ring-inset ring-[#950101aa] placeholder:text-[#950101aa] focus:ring-2 focus:ring-inset focus:ring-[#950101] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#950101aa]">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handlePassword}
                    required
                    className="bg-white block w-full rounded-md border-0 p-1.5 text-[#950101aa] shadow-sm ring-1 ring-inset ring-[#950101aa] placeholder:text-[#950101aa] focus:ring-2 focus:ring-inset focus:ring-[#950101] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-[#950101aa] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#950101aa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading && 'relative'}`}
                disabled={loading}
              >
                {loading && <div className="spinner" />}
                {loading ? "Creating your account..." : "Create"}
              </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already one of us?{' '}
              <a href="/" className="font-semibold leading-6 text-[#950101aa] hover:text-[#950101]">
                Login
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
export default SignupForm;