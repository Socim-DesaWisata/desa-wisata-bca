import DashboardController from './DashboardController'
import DashboardApiController from './DashboardApiController'
import UserController from './UserController'
import SurveyQuestionController from './SurveyQuestionController'
import TourismVillageController from './TourismVillageController'
import UmkmController from './UmkmController'
import PariwisataController from './PariwisataController'
import VillageSurveyAssignmentController from './VillageSurveyAssignmentController'
import Settings from './Settings'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    DashboardApiController: Object.assign(DashboardApiController, DashboardApiController),
    UserController: Object.assign(UserController, UserController),
    SurveyQuestionController: Object.assign(SurveyQuestionController, SurveyQuestionController),
    TourismVillageController: Object.assign(TourismVillageController, TourismVillageController),
    UmkmController: Object.assign(UmkmController, UmkmController),
    PariwisataController: Object.assign(PariwisataController, PariwisataController),
    VillageSurveyAssignmentController: Object.assign(VillageSurveyAssignmentController, VillageSurveyAssignmentController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers