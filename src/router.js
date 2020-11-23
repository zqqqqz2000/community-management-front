import Admin from './components/admin/Admin'
import ResidentManage from './components/resident_manage/ResidentManage'
import ResidentMemberManage from './components/property_manage/ResidentMemberManage'
import ParkingManage from './components/resident_manage/ParkingManage'
import HousegManage from './components/resident_manage/HouseManage'
import MaintenanceManage from './components/resident_manage/MaintenanceManage'
import PersonalInformation from './components/resident_manage/PersonalInformation'
import PropertyManage from './components/property_manage/PropertyManage'
import MaintenanceManageProp from './components/property_manage/MaintenanceManage'
import ParkingSpotManage from './components/property_manage/ParkingSpotManage'
import HouseManageP from './components/property_manage/HouseManageP'
import PropertyInformation from './components/property_manage/PropertyInformation'
import VueRouter from 'vue-router'


const routes = [
    {
        path: '/',
        component: Admin,
        meta: {
            title: '小区管理系统'
        }
    },
    {
        path: '/resident-manage',
        component: ResidentManage,
        meta: {
            title: '小区住户管理系统'
        },
        children: [
            {
                path: 'parking-manage',
                component: ParkingManage,
                meta: {
                    title: '住户管理-停车管理'
                }
            },
            {
                path: 'house-manage',
                component: HousegManage,
                meta: {
                    title: '住户管理-房屋管理'
                }
            },
            {
                path: 'maintenance-manage',
                component: MaintenanceManage,
                meta: {
                    title: '住户管理-维修管理'
                }
            },
            {
                path: 'personal-information',
                component: PersonalInformation,
                meta: {
                    title: '住户管理-个人信息'
                }
            },
        ]
    },
    {
        path: '/property-manage',
        component: PropertyManage,
        meta: {
            title: '物业管理'
        },
        children: [
            {
                path: 'resident-member-manage',
                component: ResidentMemberManage,
                meta: {
                    title: '住户管理'
                }
            },
            {
                path: 'parking-spot-manage',
                component: ParkingSpotManage,
                meta: {
                    title: '停车位管理'
                }
            },
            {
                path: 'house-manage',
                component: HouseManageP,
                meta: {
                    title: '房屋管理'
                }
            },
            {
                path: 'maintenance-manage',
                component: MaintenanceManageProp,
                meta: {
                    title: '物业管理'
                }
            },
            {
                path: 'property-information',
                component: PropertyInformation,
                meta: {
                    title: '小区信息'
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})



export default {
    router
}