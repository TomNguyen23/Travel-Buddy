import AuthLayout from "@/layouts/auth/authLayout"
import BlankContentWithLogo from "@/layouts/blank-content-with-logo/blank-content-with-logo-layout"
import UserSettingProfileLayout from "@/layouts/profile/user-setting-profile"
import TeamJourneyDetailLayout from "@/layouts/team-journey/team-journey-detail-layout"
import DiscoverCategoriesLayout from "@/layouts/discover/discover-categoties"
import DiscoverRankingListLayout from "@/layouts/discover/discover-ranking-list"
import ReviewLayout from "@/layouts/review/review-layout"
import SiteDetailsLayout from "@/layouts/site-detail/site-detail"
import MapLayout from "@/layouts/map/map-layout"
import NewSitelayout from "@/layouts/new-site/new-site"

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
import DiscoverRankingHotel from "@/pages/discover/discover-ranking-hotel"
import DiscoverRankingDestination from "@/pages/discover/discover-ranking-destination"
import SiteReview from "@/pages/review/site-review"
import DiscoverRankingCuisine from "@/pages/discover/discover-ranking-cuisine"
import DiscoverRankingNature from "@/pages/discover/discover-ranking-nature"
import DiscoverRankingEntertainment from "@/pages/discover/discover-ranking-entetainment"
import HotelDetail from "@/pages/site-detail/hotel-detail"
import SiteMapDetail from "@/pages/site-detail/site-map-detail"
import HomePage from "@/pages/home/home"
import SiteReviewUpdate from "@/pages/review/site-review-update"
import MyReviews from "@/pages/profile/my-reviews"
import ChooseSiteType from "@/pages/new-site/choose-site-type"
import NewSiteInfo from "@/pages/new-site/new-site-info"
import SiteMedia from "@/pages/new-site/site-media"

const publicRoutes = [
    {path: '/', element: HomePage},
    {path: '/login', element: LoginPage, Layout: AuthLayout },
    {path: '/register', element: RegisterPage, Layout: AuthLayout },
    {path: '/register/username', element: RegisterUsername, Layout: AuthLayout },
    {path: '/personalize', element: PersonalizeIdeas, Layout: BlankContentWithLogo },
    {path: '/OTP-verification-register', element: OTPRegister, Layout: BlankContentWithLogo },
    {path: '/forget-password-email', element: ForgetPasswordEmail, Layout: AuthLayout },
    {path: '/OTP-verification-forget-password', element: OTPforgetPassword, Layout: BlankContentWithLogo },
    {path: '/new-password', element: NewPassword, Layout: AuthLayout },
    {path: '/discover', element: DiscoverCategories, Layout: DiscoverCategoriesLayout },
    {path: '/discover/hotel&resort', element: DiscoverRankingHotel, Layout: DiscoverRankingListLayout },
    {path: '/discover/destination', element: DiscoverRankingDestination, Layout: DiscoverRankingListLayout },
    {path: '/discover/cuisine', element: DiscoverRankingCuisine, Layout: DiscoverRankingListLayout },
    {path: '/discover/nature', element: DiscoverRankingNature, Layout: DiscoverRankingListLayout },
    {path: '/discover/entertainment', element: DiscoverRankingEntertainment, Layout: DiscoverRankingListLayout },

    {path: '/details/hotel', element: HotelDetail, Layout: SiteDetailsLayout },
    {path: '/details/map', element: SiteMapDetail, Layout: MapLayout },


    {path: '/new-site/site-type', element: ChooseSiteType, Layout: BlankContentWithLogo },
    {path: '/new-site/site-info', element: NewSiteInfo, Layout: NewSitelayout },
    {path: '/new-site/site-media', element: SiteMedia, Layout: NewSitelayout },
]

// "roles" trong này do mình tự quyết định nó phân quyền cho đối tượng nào được truy cập vào route này
const privateRoutes = [
    {path: '/your-profile', element: UserProfile, Layout: UserSettingProfileLayout },
    {path: '/password-and-security', element: PasswordAndSecurity, Layout: UserSettingProfileLayout },
    {path: '/my-reviews', element: MyReviews, Layout: UserSettingProfileLayout },
    {path: '/my-notifications', element: MyNotifications, Layout: UserSettingProfileLayout },
    {path: '/my-journeys', element: TeamJourneys, Layout: TeamJourneySummaryLayout },
    {path: '/team-journey-schedule', element: TeamJourneySchedule, Layout: TeamJourneyDetailLayout },

    {path: '/review/site', element: SiteReview, Layout: ReviewLayout },
    {path: '/review/site/update', element: SiteReviewUpdate, Layout: ReviewLayout },
]

export { publicRoutes, privateRoutes }