import { createBrowserRouter } from 'react-router-dom'

import { routes } from '@/routes'
import DashboardLayout from '@/views/layouts/DashboardLayout'
import {
  AccommodationCreatePage,
  AccommodationEditPage,
  AccommodationTypeCreatePage,
  AccommodationTypeEditPage,
  AccommodationTypesPage,
  AccommodationsPage,
  CountriesPage,
  CountryCreatePage,
  CountryEditPage,
  CurrenciesPage,
  CurrencyCreatePage,
  CurrencyEditPage,
  FoodCreatePage,
  FoodEditPage,
  FoodsPage,
  GroupCreatePage,
  GroupEditPage,
  GroupsPage,
  GuideCreatePage,
  GuideEditPage,
  GuidesPage,
  LanguageCreatePage,
  LanguageEditPage,
  LanguagesPage,
  LocationsCitiesPage,
  LocationsCityCreatePage,
  LocationsCityEditPage,
  LocationsContinentCreatePage,
  LocationsContinentEditPage,
  LocationsContinentsPage,
  LocationsCountriesPage,
  LocationsCountryCreatePage,
  LocationsCountryEditPage,
  LocationsRegionCreatePage,
  LocationsRegionEditPage,
  LocationsRegionsPage,
  LocationsStateCreatePage,
  LocationsStateEditPage,
  LocationsStatesPage,
  MandatoriesPage,
  MandatoryCreatePage,
  MandatoryPage,
  MediaPage,
  OperatorCreatePage,
  OperatorEditPage,
  OperatorsPage,
  PersonGuideCreatePage,
  PersonGuideEditPage,
  PersonGuidesPage,
  PostEditPage,
  PostsPage,
  PromotionCreatePage,
  PromotionEditPage,
  PromotionsPage,
  ServiceCreatePage,
  ServiceEditPage,
  ServicesPage,
  StatusCreatePage,
  StatusEditPage,
  StatusesPage,
  TourEditPage,
  ToursPage,
  TypeCreatePage,
  TypeEditPage,
  TypesPage,
} from '@/views/pages'
import { LoginPage } from '@/views/pages/LoginPage'

/* eslint-disable perfectionist/sort-objects */
/* eslint-disable max-lines */
export const router = createBrowserRouter([
  {
    children: [
      {
        path: '/media',
        element: <MediaPage />,
      },
      {
        path: routes.countries.index,
        children: [
          {
            index: true,
            element: <CountriesPage />,
          },
          {
            path: ':id',
            element: <CountryEditPage />,
          },
          {
            path: 'create',
            element: <CountryCreatePage />,
          },
        ],
      },
      {
        path: routes.languages.index,
        children: [
          {
            index: true,
            element: <LanguagesPage />,
          },
          {
            path: ':id',
            element: <LanguageEditPage />,
          },
          {
            path: 'create',
            element: <LanguageCreatePage />,
          },
        ],
      },
      {
        path: routes.posts.index,
        children: [
          {
            index: true,
            element: <PostsPage />,
          },
          {
            path: ':id',
            element: <PostEditPage />,
          },
        ],
      },
      {
        path: routes.foods.index,
        children: [
          {
            index: true,
            element: <FoodsPage />,
          },
          {
            path: ':id',
            element: <FoodEditPage />,
          },
          {
            path: 'create',
            element: <FoodCreatePage />,
          },
        ],
      },
      {
        path: routes.accommodationTypes.index,
        children: [
          {
            index: true,
            element: <AccommodationTypesPage />,
          },
          {
            path: ':id',
            element: <AccommodationTypeEditPage />,
          },
          {
            path: 'create',
            element: <AccommodationTypeCreatePage />,
          },
        ],
      },
      {
        path: routes.statuses.index,
        children: [
          {
            index: true,
            element: <StatusesPage />,
          },
          {
            path: ':id',
            element: <StatusEditPage />,
          },
          {
            path: 'create',
            element: <StatusCreatePage />,
          },
        ],
      },
      {
        path: routes.groups.index,
        children: [
          {
            index: true,
            element: <GroupsPage />,
          },
          {
            path: ':id',
            element: <GroupEditPage />,
          },
          {
            path: 'create',
            element: <GroupCreatePage />,
          },
        ],
      },
      {
        path: routes.types.index,
        children: [
          {
            index: true,
            element: <TypesPage />,
          },
          {
            path: ':id',
            element: <TypeEditPage />,
          },
          {
            path: 'create',
            element: <TypeCreatePage />,
          },
        ],
      },
      {
        path: routes.currencies.index,
        children: [
          {
            index: true,
            element: <CurrenciesPage />,
          },
          {
            path: ':id',
            element: <CurrencyEditPage />,
          },
          {
            path: 'create',
            element: <CurrencyCreatePage />,
          },
        ],
      },
      {
        path: routes.operators.index,
        children: [
          {
            index: true,
            element: <OperatorsPage />,
          },
          {
            path: ':id',
            element: <OperatorEditPage />,
          },
          {
            path: 'create',
            element: <OperatorCreatePage />,
          },
        ],
      },
      {
        path: routes.promotions.index,
        children: [
          {
            index: true,
            element: <PromotionsPage />,
          },
          {
            path: ':id',
            element: <PromotionEditPage />,
          },
          {
            path: 'create',
            element: <PromotionCreatePage />,
          },
        ],
      },
      {
        path: routes.accommodations.index,
        children: [
          {
            index: true,
            element: <AccommodationsPage />,
          },
          {
            path: ':id',
            element: <AccommodationEditPage />,
          },
          {
            path: 'create',
            element: <AccommodationCreatePage />,
          },
        ],
      },
      {
        path: routes.mandatories.index,
        children: [
          {
            index: true,
            element: <MandatoriesPage />,
          },
          {
            path: ':id',
            element: <MandatoryPage />,
          },
          {
            path: 'create',
            element: <MandatoryCreatePage />,
          },
        ],
      },
      {
        path: routes.locations.index,
        children: [
          {
            path: routes.locations.continents.index.replace(`${routes.locations.index}/`, ''),
            children: [
              {
                index: true,
                element: <LocationsContinentsPage />,
              },
              {
                path: ':id',
                element: <LocationsContinentEditPage />,
              },
              {
                path: 'create',
                element: <LocationsContinentCreatePage />,
              },
            ],
          },
          {
            path: routes.locations.countries.index.replace(`${routes.locations.index}/`, ''),
            children: [
              {
                index: true,
                element: <LocationsCountriesPage />,
              },
              {
                path: ':id',
                element: <LocationsCountryEditPage />,
              },
              {
                path: 'create',
                element: <LocationsCountryCreatePage />,
              },
            ],
          },
          {
            path: routes.locations.states.index.replace(`${routes.locations.index}/`, ''),
            children: [
              {
                index: true,
                element: <LocationsStatesPage />,
              },
              {
                path: ':id',
                element: <LocationsStateEditPage />,
              },
              {
                path: 'create',
                element: <LocationsStateCreatePage />,
              },
            ],
          },
          {
            path: routes.locations.regions.index.replace(`${routes.locations.index}/`, ''),
            children: [
              {
                index: true,
                element: <LocationsRegionsPage />,
              },
              {
                path: ':id',
                element: <LocationsRegionEditPage />,
              },
              {
                path: 'create',
                element: <LocationsRegionCreatePage />,
              },
            ],
          },
          {
            path: routes.locations.cities.index.replace(`${routes.locations.index}/`, ''),
            children: [
              {
                index: true,
                element: <LocationsCitiesPage />,
              },
              {
                path: ':id',
                element: <LocationsCityEditPage />,
              },
              {
                path: 'create',
                element: <LocationsCityCreatePage />,
              },
            ],
          },
        ],
      },
      {
        path: routes.guides.index,
        children: [
          {
            index: true,
            element: <GuidesPage />,
          },
          {
            path: ':id',
            element: <GuideEditPage />,
          },
          {
            path: 'create',
            element: <GuideCreatePage />,
          },
        ],
      },
      {
        path: routes.personGuides.index,
        children: [
          {
            index: true,
            element: <PersonGuidesPage />,
          },
          {
            path: ':id',
            element: <PersonGuideEditPage />,
          },
          {
            path: 'create',
            element: <PersonGuideCreatePage />,
          },
        ],
      },
      {
        path: routes.services.index,
        children: [
          {
            index: true,
            element: <ServicesPage />,
          },
          {
            path: ':id',
            element: <ServiceEditPage />,
          },
          {
            path: 'create',
            element: <ServiceCreatePage />,
          },
        ],
      },
      {
        path: routes.tours.index,
        children: [
          {
            index: true,
            element: <ToursPage />,
          },
          {
            path: ':id',
            element: <TourEditPage />,
          },
        ],
      },
    ],
    element: <DashboardLayout />,
    path: '/',
  },
  {
    element: <LoginPage />,
    path: '/login',
  },
])
