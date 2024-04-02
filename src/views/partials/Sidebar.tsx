import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { routes } from '@/routes'
import { Menu, type MenuProps } from 'antd'
import {
  FaBed,
  FaBuilding,
  FaCubes,
  FaEarthEurope,
  FaFlag,
  FaGlobe,
  FaImages,
  FaLanguage,
  FaLocationDot,
  FaMoneyBill,
  FaNewspaper,
  FaPercent,
  FaPersonShelter,
  FaUtensils,
} from 'react-icons/fa6'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    children,
    icon,
    key,
    label,
    type,
  } as MenuItem
}

const iconSize = 24

const items: MenuProps['items'] = [
  getItem(<Link to={routes.media}>Media</Link>, routes.media, <FaImages size={iconSize} />),
  getItem(
    <Link to={routes.countries.index}>Countries</Link>,
    routes.countries.index,
    <FaFlag size={iconSize} />
  ),
  getItem(
    <Link to={routes.languages.index}>Languages</Link>,
    routes.languages.index,
    <FaLanguage size={iconSize} />
  ),
  getItem(
    <Link to={routes.posts.index}>Posts</Link>,
    routes.posts.index,
    <FaNewspaper size={iconSize} />
  ),
  getItem(
    <Link to={routes.foods.index}>Foods</Link>,
    routes.foods.index,
    <FaUtensils size={iconSize} />
  ),
  getItem(
    <Link to={routes.accommodationTypes.index}>Accommodation Types</Link>,
    routes.accommodationTypes.index,
    <FaPersonShelter size={iconSize} />
  ),
  getItem(
    <Link to={routes.statuses.index}>Statuses</Link>,
    routes.statuses.index,
    <FaCubes size={iconSize} />
  ),
  getItem(
    <Link to={routes.groups.index}>Groups</Link>,
    routes.groups.index,
    <FaCubes size={iconSize} />
  ),
  getItem(
    <Link to={routes.types.index}>Types</Link>,
    routes.types.index,
    <FaCubes size={iconSize} />
  ),
  getItem(
    <Link to={routes.currencies.index}>Currencies</Link>,
    routes.currencies.index,
    <FaMoneyBill size={iconSize} />
  ),
  getItem(
    <Link to={routes.operators.index}>Operators</Link>,
    routes.operators.index,
    <FaBuilding size={iconSize} />
  ),
  getItem(
    <Link to={routes.promotions.index}>Promotions</Link>,
    routes.promotions.index,
    <FaPercent size={iconSize} />
  ),
  getItem(
    <Link to={routes.accommodations.index}>Accommodations</Link>,
    routes.accommodations.index,
    <FaBed size={iconSize} />
  ),
  getItem(
    <Link to={routes.mandatories.index}>Mandatories</Link>,
    routes.mandatories.index,
    <FaMoneyBill size={iconSize} />
  ),
  getItem('Locations', routes.locations.index, <FaGlobe size={iconSize} />, [
    getItem(
      <Link to={routes.locations.continents.index}>Continents</Link>,
      routes.locations.continents.index,
      <FaEarthEurope size={iconSize} />
    ),
    getItem(
      <Link to={routes.locations.countries.index}>Countries</Link>,
      routes.locations.countries.index,
      <FaFlag size={iconSize} />
    ),
    getItem(
      <Link to={routes.locations.states.index}>States</Link>,
      routes.locations.states.index,
      <FaLocationDot size={iconSize} />
    ),
    getItem(
      <Link to={routes.locations.regions.index}>Regions</Link>,
      routes.locations.regions.index,
      <FaLocationDot size={iconSize} />
    ),
    getItem(
      <Link to={routes.locations.cities.index}>Cities</Link>,
      routes.locations.cities.index,
      <FaLocationDot size={iconSize} />
    ),
  ]),
]

export const Sidebar = () => {
  const location = useLocation()

  return (
    <>
      <Menu items={items} mode={'inline'} selectedKeys={[location.pathname]} />
    </>
  )
}
