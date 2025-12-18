import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/utilities/TextInput";
import { useAuth } from "../../contexts/AuthContext";
import { login } from "../../lib/auth";
import { setTokens } from "../../lib/tokenStorage";
import GoogleOAuth from "../../components/auth/GoogleOAuth";

const Login = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState({
    form: true,
    confirmEmail: false,
  });
  const containerClassNames =
    "bg-[#F7F7F7] flex gap-2 items-center border-2 border-[#0000001A] rounded-[10px] w-full text-[#6D6D6D] px-5\
   ";
  const inputClassNames =
    "bg-[#F7F7F7] py-3 w-full text-[#6D6D6D] text-[13px]  rounded-[10px] \
    placeholder:text-[#6D6D6D] placeholder:text-[13px] focusl:outline-green-200 outline-0";

  return (
    <main className="lg:flex h-screen">
      <div className="lg:flex-[0.5] px-5 lg:px-0">
        <div className="w-full lg:w-[514px] mx-auto my-[60px]">
          <a href="/" className="flex items-center gap-2 mb-5">
            <img src="svg/logo.svg" alt="" className="mb-2" />
          </a>
          {activeView.form && (
            <div>
              <div className="flex flex-col gap-7">
                <div>
                  <h1 className="text-[24px] text-[#6D6D6D] leading-[31px] font-bold">
                    Log Into Your Account
                  </h1>
                  <span className="text-[11px] text-[#A5A5A5] font-light">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-primary font-medium">
                      Sign Up
                    </Link>
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <GoogleOAuth isLogin />

                <div className="relative flex items-center justify-center  mb-9">
                  <hr className="flex-grow border-t border-gray-300" />
                  <div className="absolute px-3 bg-white text-[#A5A5A5] text-[11px] font-light">
                    OR
                  </div>
                  <hr className="flex-grow border-t border-gray-300 " />
                </div>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  // validate={(values) => {
                  //   const errors = {};
                  //   if (!values.email) {
                  //     errors.email = "Required";
                  //   } else if (
                  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  //   ) {
                  //     errors.email = "Invalid email address";
                  //   }
                  //   return errors;
                  // }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                    password: Yup.string().required(
                      "Please enter your password"
                    ),
                    // .matches(
                    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    //   "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
                    // ),
                  })}
                  onSubmit={async (
                    values,
                    { setSubmitting, setFieldError }
                  ) => {
                    const { email, password } = values;

                    try {
                      const { refresh_token, data: user } = await login(
                        email,
                        password
                      );

                      if (user) {
                        setTokens(user.access_token, refresh_token);
                        authLogin(user);
                        navigate("/dashboard");
                      }
                    } catch (error) {
                      if (axios.isAxiosError(error) && error.response) {
                        const errorMessage =
                          error.response.data?.message || "Unknown error";

                        switch (error.response.status) {
                          case 404:
                            console.log("Non-existent user");
                            setFieldError("email", errorMessage);
                            break;
                          case 401:
                            console.log("Password is wrong");
                            setFieldError("password", errorMessage);
                            break;
                          default:
                            console.log(
                              `Error: ${error.response.status} - ${errorMessage}`
                            );
                        }
                      } else {
                        console.log("Unexpected error:", error);
                      }

                      console.log("Full error object:", error);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-1">
                      <TextInput
                        name="email"
                        type="email"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        placeholder="Email Address"
                        icon="svg/email.svg"
                      />

                      <TextInput
                        name="password"
                        type="password"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        placeholder="Password"
                        icon="svg/password.svg"
                        showPasswordToggle={true}
                      />
                      <Link
                        href={"/forget-password"}
                        className="flex justify-end  text-primary text-[15px] -mt-3"
                      >
                        Forgot Password?
                      </Link>

                      <button
                        type="submit"
                        className="bg-primary w-full flex justify-center items-center text-white border-2 border-[#FFFFFF3D] rounded-[10px] p-3 mt-3 text-[14px] font-bold"
                      >
                        {isSubmitting ? "Signing in..." : "Login"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:flex flex-[0.5] items-center justify-center w-full h-full bg-black text-white rounded-tl-[30px] rounded-bl-[30px]">
        <div>
          <div className="w-[514px] flex flex-col gap-6 mx-auto -mt-[10px]">
            <h1 className="text-[40px] font-extrabold leading-[52px]">
              Welcome Back To Our Learning Community
            </h1>
            <p className="text-[24px] font-light leading-[31px]">
              Continue from where you stopped. Learn. Grow. Get Hired. Join
              thousands of students learning at nebiant.
            </p>
            <div className="flex gap-3 items-center">
              <img src="img/people.png" alt="" />
              <span>Join 2M Students</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
