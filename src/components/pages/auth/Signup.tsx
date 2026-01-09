"use client";

import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordCheck from "../../utilities/PasswordCheck";
import TextInput from "../../utilities/TextInput";
import { useAuth } from "../../../contexts/AuthContext";
import { usePasswordValidation } from "../../../hooks/usePasswordValidation";
import { signup, login } from "../../../lib/auth";
import { setTokens } from "../../../lib/tokenStorage";
import GoogleOAuth from "../../auth/GoogleOAuth";

const Signup = () => {
  const { login: authLogin } = useAuth();
  const router = useRouter();
  const validatePassword = usePasswordValidation();

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
    <main className="flex h-screen">
      {/* <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div> */}

      <div className="lg:flex-[0.5] overflow-y-scroll px-5 lg:px-0">
        <div className="lg:w-[514px] mx-auto my-[60px]">
          <a href="/" className="flex items-center gap-2 mb-5">
            <img src="svg/logo.svg" alt="" className="mb-2" />
          </a>
          {activeView.form && (
            <div>
              <div className="flex flex-col gap-7">
                <div>
                  <h1 className="text-[24px] text-[#6D6D6D] leading-[31px] font-bold">
                    Sign Up Your Account
                  </h1>
                  <span className="text-[11px] text-[#A5A5A5] font-light">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-medium">
                      Sign In
                    </Link>
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <GoogleOAuth />

                <div className="relative flex items-center justify-center  mb-9">
                  <hr className="flex-grow border-t border-gray-300" />
                  <div className="absolute px-3 bg-white text-[#A5A5A5] text-[11px] font-light">
                    OR
                  </div>
                  <hr className="flex-grow border-t border-gray-300 " />
                </div>

                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone_number: "",
                    password: "",
                    re_password: "",
                  }}
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
                    name: Yup.string().required("Name is required"),
                    phone_number: Yup.string().required(
                      "Phone number is required"
                    ),
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                    password: Yup.string()
                      .required("Please enter your password")
                      .test(
                        "password-validation",
                        "Password does not meet requirements",
                        function (value) {
                          return validatePassword(value).isValid;
                        }
                      ),
                    re_password: Yup.string()
                      .oneOf(
                        [Yup.ref("password"), undefined],
                        "Passwords must match"
                      )
                      .required("Please confirm your password"),
                  })}
                  onSubmit={async (
                    values,
                    { setSubmitting, setFieldError, setStatus }
                  ) => {
                    const { name, email, phone_number, password } = values;

                    try {
                      // Step 1: Sign up
                      await signup(name, email, phone_number, password);

                      // Step 2: Login
                      const { refresh_token, data: user } = await login(
                        email,
                        password
                      );

                      // Step 3: Set tokens and redirect
                      setTokens(user.access_token, refresh_token);
                      authLogin(user);
                      router.push("/dashboard");
                    } catch (error) {
                      if (axios.isAxiosError(error) && error.response) {
                        const { status, data } = error.response;
                        const errorMessage =
                          data?.message || "An unexpected error occurred";

                        switch (status) {
                          case 403:
                            setFieldError(
                              "email",
                              "This email is already registered"
                            );
                            break;
                          // case 400:
                          //   // Handle validation errors
                          //   if (data.errors) {
                          //     Object.entries(data.errors).forEach(
                          //       ([field, message]) => {
                          //         setFieldError(field, message);
                          //       }
                          //     );
                          //   } else {
                          //     setStatus(errorMessage);
                          //   }
                          //   break;
                          default:
                            setStatus(
                              `An error occurred. Please try again later. (${status})`
                            );
                        }

                        console.error(`API Error: ${status} - ${errorMessage}`);
                      } else {
                        console.error("Unexpected error:", error);
                        setStatus(
                          "An unexpected error occurred. Please try again."
                        );
                      }
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting, values }) => (
                    <Form className="flex flex-col gap-1">
                      <TextInput
                        name="name"
                        type="text"
                        placeholder="Full name"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        icon="svg/case.svg"
                      />
                      <TextInput
                        name="email"
                        type="email"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        placeholder="Email Address"
                        icon="svg/email.svg"
                      />
                      <TextInput
                        name="phone_number"
                        type="text"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        placeholder="Phone Number"
                        icon="svg/phone.svg"
                      />{" "}
                      <TextInput
                        name="password"
                        type="password"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        placeholder="Password"
                        icon="svg/password.svg"
                        showPasswordToggle={true}
                      />
                      <PasswordCheck password={values.password} />{" "}
                      <TextInput
                        name="re_password"
                        type="password"
                        inputClassNames={inputClassNames}
                        containerClassNames={containerClassNames}
                        placeholder="Confirm Password"
                        icon="svg/password.svg"
                        showPasswordToggle={true}
                      />
                      <button
                        type="submit"
                        // onClick={() =>
                        //   setActiveView({
                        //     ...activeView,
                        //     form: false,
                        //     confirmEmail: true,
                        //   })
                        // }
                        className="bg-primary w-full flex justify-center items-center text-white border-2 border-[#FFFFFF3D] rounded-[10px] p-3 text-[14px] font-bold"
                      >
                        {isSubmitting
                          ? "Creating account..."
                          : "Create Account"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}

          {activeView.confirmEmail && (
            <div>
              <h1 className="text-[24px] text-[#6D6D6D] leading-[31px] font-bold mb-1">
                Verify Your Identity{" "}
              </h1>
              <span className="text-[#6D6D6D] text-[20px] font-light">
                Please Enter the passcode sent to your{" "}
                <span className="text-primary font-semibold">
                  {" "}
                  example@gmail.com{" "}
                </span>
                to proceed
              </span>

              <div className="flex flex-col gap-2 mt-4 w-full lg:w-[373px]">
                <span className="text-[#6D6D6D]">Passcode</span>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    maxLength={1}
                    className="bg-[#EDEDED] w-[68px] h-[58px] rounded-[16px] p-3 flex items-center"
                  />
                  <input
                    type="text"
                    maxLength={1}
                    className="bg-[#EDEDED] w-[68px] h-[58px] rounded-[16px] p-3"
                  />
                  <input
                    type="text"
                    maxLength={1}
                    className="bg-[#EDEDED] w-[68px] h-[58px] rounded-[16px] p-3"
                  />
                  <input
                    type="text"
                    maxLength={1}
                    className="bg-[#EDEDED] w-[68px] h-[58px] rounded-[16px] p-3"
                  />
                  <input
                    type="text"
                    maxLength={1}
                    className="bg-[#EDEDED] w-[68px] h-[58px] rounded-[16px] p-3"
                  />
                </div>
                <div className="flex items-center gap-2 self-end">
                  <img src="svg/timer2.svg" alt="" className="h-6" />
                  <span className="text-[19px] text-[#A39FAB] font-medium">
                    30 secs
                  </span>
                </div>
              </div>
              <button className="bg-primary w-full flex justify-center items-center text-white border-2 border-[#FFFFFF3D] rounded-[10px] p-3 my-6 text-[14px]">
                Confirm
              </button>

              <p className="text-[#8C8CA1]">
                Didn't receive the code?{" "}
                <Link href={""} className="text-primary">
                  Resend code
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:flex flex-[0.5] items-center justify-center w-full h-full bg-black text-white rounded-tl-[30px] rounded-bl-[30px]">
        <div>
          <div className="w-[514px] flex flex-col gap-6 mx-auto -mt-[10px]">
            <h1 className="text-[40px] font-extrabold leading-[52px]">
              Welcome To Our Learning Community
            </h1>
            <p className="text-[24px] font-light leading-[31px]">
              Learn. Grow. Get Hired. Join thousands of students learning at
              nebiant. Explore courses that employers are hiring for.
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

export default Signup;