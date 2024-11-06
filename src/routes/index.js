import AuthLayout from "@/layouts/auth/authLayout"
import BlankContentWithLogo from "@/layouts/blank-content-with-logo/blank-content-with-logo-layout"
import UserSettingProfileLayout from "@/layouts/profile/user-setting-profile"
import TeamJourneyDetailLayout from "@/layouts/team-journey/team-journey-detail-layout"
import DiscoverCategoriesLayout from "@/layouts/discover/discover-categoties"

import LoginPage from "@/pages/auth/login"
import RegisterPage from "@/pages/auth/register"
import RegisterUsername from "@/pages/auth/register-username"
import UserProfile from "@/pages/profile/user-profile"
import PersonalizeIdeas from "@/pages/profile/personalize-ideas/personalize-ideas"
import OTPRegister from "@/pages/auth/OTP-register"
import PasswordAndSecurity from "@/pages/profile/password-and-security"
import MyNotifications from "@/pages/profile/my-notifications"
import TeamJourneySchedule from "@/pages/team-journey/team-journey-schedule"
import OTPforgetPassword from "@/pages/auth/OTP-forget-password"
import TeamJourneySummaryLayout from "@/layouts/team-journey/team-journey-summary-layout"
import TeamJourneys from "@/pages/team-journey/team-journeys"
import ForgetPasswordEmail from "@/pages/auth/forget-password-email"
import NewPassword from "@/pages/auth/new-password"
import DiscoverCategories from "@/pages/discover/discover-categories-page"

const publicRoutes = [
    {path: '/', element: UserProfile},
    {path: '/login', element: LoginPage, Layout: AuthLayout },
    {path: '/register', element: RegisterPage, Layout: AuthLayout },
    {path: '/register/username', element: RegisterUsername, Layout: AuthLayout },
    {path: '/personalize', element: PersonalizeIdeas, Layout: BlankContentWithLogo },
    {path: '/OTP-verification-register', element: OTPRegister, Layout: BlankContentWithLogo },
    {path: '/forget-password-email', element: ForgetPasswordEmail, Layout: AuthLayout },
    {path: '/OTP-verification-forget-password', element: OTPforgetPassword, Layout: BlankContentWithLogo },
    {path: '/new-password', element: NewPassword, Layout: AuthLayout },
    {path: '/discover', element: DiscoverCategories, Layout: DiscoverCategoriesLayout },
    
]

// "roles" trong này do mình tự quyết định nó phân quyền cho đối tượng nào được truy cập vào route này
const privateRoutes = [
    {path: '/your-profile', element: UserProfile, Layout: UserSettingProfileLayout },
    {path: '/password-and-security', element: PasswordAndSecurity, Layout: UserSettingProfileLayout },
    {path: '/my-notifications', element: MyNotifications, Layout: UserSettingProfileLayout },
    {path: '/my-journeys', element: TeamJourneys, Layout: TeamJourneySummaryLayout },
    {path: '/team-journey-schedule', element: TeamJourneySchedule, Layout: TeamJourneyDetailLayout },
]

export { publicRoutes, privateRoutes }