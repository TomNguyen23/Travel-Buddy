import AuthLayout from "@/layouts/auth/authLayout"
import BlankContentWithLogo from "@/layouts/blank-content-with-logo/blank-content-with-logo-layout"
import UserSettingProfileLayout from "@/layouts/profile/user-setting-profile"

import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register"
import RegisterUsername from "@/pages/auth/register-username"
import UserProfile from "@/pages/profile/user-profile"
import PersonalizeIdeas from "@/pages/profile/personalize-ideas/personalize-ideas"
import OTPVerification from "@/pages/auth/OTP"
import PasswordAndSecurity from "@/pages/profile/password-and-security"
import MyNotifications from "@/pages/profile/my-notifications"

const publicRoutes = [
    {path: '/', element: UserProfile},
    {path: '/login', element: LoginPage, Layout: AuthLayout },
    {path: '/register', element: RegisterPage, Layout: AuthLayout },
    {path: '/register/username', element: RegisterUsername, Layout: AuthLayout },
    {path: '/personalize', element: PersonalizeIdeas, Layout: BlankContentWithLogo },
    {path: '/OTP-verification', element: OTPVerification, Layout: BlankContentWithLogo },
]

// "roles" trong này do mình tự quyết định nó phân quyền cho đối tượng nào được truy cập vào route này
const privateRoutes = [
    {path: '/your-profile', element: UserProfile, Layout: UserSettingProfileLayout },
    {path: '/password-and-security', element: PasswordAndSecurity, Layout: UserSettingProfileLayout },
    {path: '/my-notifications', element: MyNotifications, Layout: UserSettingProfileLayout },
]

export { publicRoutes, privateRoutes }