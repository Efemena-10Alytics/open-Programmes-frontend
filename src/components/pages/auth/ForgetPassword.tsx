"use client"
import { Formik, Form } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import TextInput from "../../utilities/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { useAuth } from "../../../contexts/AuthContext";
import { forgetPassword, resetPassword } from "../../../lib/auth";
import PasswordCheck from "../../utilities/PasswordCheck";
import { usePasswordValidation } from "../../../hooks/usePasswordValidation";

type NotificationType = "success" | "info" | "warning" | "error";

const ForgetPassword = () => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const validatePassword = usePasswordValidation();
  const router = useRouter();
  const [activeView, setActiveView] = useState({
    main: true,
    reset: false,
  });
  const containerClassNames =
    "bg-[#F7F7F7] flex gap-2 items-center border-2 border-[#0000001A] rounded-[10px] w-full text-[#6D6D6D] px-5\
   ";
  const inputClassNames =
    "bg-[#F7F7F7] py-3 w-full text-[#6D6D6D] text-[13px]  rounded-[10px] \
    placeholder:text-[#6D6D6D] placeholder:text-[13px] focusl:outline-green-200 outline-0";

  const openNotification = (type: NotificationType) => {
    notificationApi[type]({
      title: `${
        type === "success"
          ? "Check your email"
          : type === "error"
          ? "Reset failed"
          : ""
      }`,
      description: `${
        type === "success"
          ? "Please check your email, a code has been sent to you!"
          : type === "error"
          ? "Sorry! Something went wrong. Non-existent user"
          : ""
      }`,
      // duration: 0,
    });
  };
  return (
    <div>
      {contextHolder}

      <div className="bg-gray-100 h-screen lg:h-auto lg:flex lg:justify-center lg:items-center lg:mb-52 lg:mt-4 w-full lg:w-[700px] mx-auto">
        <div className="login__boxshadow w-full  py-8 px-8 lg:py-20 lg:px-12">
          <span className="flex lg:justify-center lg:items-center text-[24px] lg:text-[32px] lg:text-[#000000] lg:font-medium mb-6 lg:mb-12">
            Reset your password
          </span>

          {activeView.main && (
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
              })}
              onSubmit={async (values, { setErrors, setStatus }) => {
                const { email } = values;

                const { data, status } = await forgetPassword(email);

                if (status === 200) {
                  console.log("Password reset successful!");
                  openNotification("success");
                  setActiveView({ ...activeView, main: false, reset: true });
                } else if (status === 404) {
                  console.log("Password reset failed!");
                  openNotification("error");
                } else {
                  console.log("An unexpected error occurred");
                  openNotification("error");
                }
              }}
              onReset={(values) => {}}
            >
              {({ status, isSubmitting }) => (
                <Form>
                  <TextInput
                    name="email"
                    label="Email"
                    labelClassNames={"block mb-2 text-[#282828]"}
                    type="email"
                    inputClassNames={inputClassNames}
                    containerClassNames={containerClassNames}
                  />

                  <span className="text-xs text-primary block mb-3">
                    {status}
                  </span>

                  <button
                    type="submit"
                    className="bg-primary w-full text-white p-3 rounded-sm lg:mt-8 flex items-center justify-center"
                  >
                    {isSubmitting ? "Reseting..." : "Reset"}
                  </button>
                  <div className="text-sm text-gray-700 flex mt-3 items-center justify-between gap-3">
                    <div className="flex gap-3 items-center">
                      <Link href={"/login"}>Sign in</Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {activeView.reset && (
            <Formik
              initialValues={{
                code: "",
                password: "",
                password_confirmation: "",
              }}
              validationSchema={Yup.object({
                code: Yup.string().required(
                  "Please enter the code sent to your email"
                ),
                password: Yup.string()
                  .required("Please enter your password")
                  .test(
                    "password-validation",
                    "Password does not meet requirements",
                    function (value) {
                      return validatePassword(value).isValid;
                    }
                  ),
                password_confirmation: Yup.string()
                  .oneOf(
                    [Yup.ref("password"), undefined],
                    "Passwords must match"
                  )
                  .required("Please confirm your password"),
              })}
              onSubmit={async (values, { setErrors, setStatus }) => {
                const { code, password, password_confirmation } = values;

                const { data, status } = await resetPassword(
                  code,
                  password,
                  password_confirmation
                );

                if (status === 200) {
                  console.log("Password reset successful!");
                  openNotification("success");
                  router.push("/login");
                } else if (status === 400) {
                  console.log("Password reset failed!");
                  openNotification("error");
                } else {
                  console.log("An unexpected error occurred");
                  openNotification("error");
                }
              }}
              onReset={(values) => {}}
            >
              {({ status, isSubmitting, values }) => (
                <Form>
                  <TextInput
                    name="code"
                    type="text"
                    placeholder="Code"
                    inputClassNames={inputClassNames}
                    containerClassNames={containerClassNames}
                    icon="svg/case.svg"
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
                  <PasswordCheck password={values.password} />{" "}
                  <TextInput
                    name="password_confirmation"
                    type="password"
                    inputClassNames={inputClassNames}
                    containerClassNames={containerClassNames}
                    placeholder="Confirm Password"
                    icon="svg/password.svg"
                    showPasswordToggle={true}
                  />
                  <span className="text-xs text-primary block mb-3">
                    {status}
                  </span>
                  <button
                    type="submit"
                    className="bg-primary w-full text-white p-3 rounded-sm lg:mt-8 flex items-center justify-center"
                  >
                    {isSubmitting ? "Reseting..." : "Reset"}
                  </button>
                  <div className="text-sm text-gray-700 flex mt-3 items-center justify-between gap-3">
                    <div className="flex gap-3 items-center">
                      <Link href={"/login"}>Sign in</Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
