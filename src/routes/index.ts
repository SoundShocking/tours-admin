export const routes = {
  accommodationTypes: {
    create: '/accommodation-types/create',
    edit: (id: number) => `/accommodation-types/${id}`,
    index: '/accommodation-types',
  },
  accommodations: {
    create: '/accommodations/create',
    edit: (id: number) => `/accommodations/${id}`,
    index: '/accommodations',
  },
  countries: {
    create: '/countries/create',
    edit: (id: number) => `/countries/${id}`,
    index: '/countries',
  },
  currencies: {
    create: '/currencies/create',
    edit: (id: number) => `/currencies/${id}`,
    index: '/currencies',
  },
  foods: {
    create: '/foods/create',
    edit: (id: number) => `/foods/${id}`,
    index: '/foods',
  },
  groups: {
    create: '/groups/create',
    edit: (id: number) => `/groups/${id}`,
    index: '/groups',
  },
  guides: {
    create: '/guides/create',
    edit: (id: number) => `/guides/${id}`,
    index: '/guides',
  },
  languages: {
    create: '/languages/create',
    edit: (id: number) => `/languages/${id}`,
    index: '/languages',
  },
  locations: {
    cities: {
      create: '/locations/cities/create',
      edit: (id: number) => `/locations/cities/${id}`,
      index: '/locations/cities',
    },
    continents: {
      create: '/locations/continents/create',
      edit: (id: number) => `/locations/continents/${id}`,
      index: '/locations/continents',
    },
    countries: {
      create: '/locations/countries/create',
      edit: (id: number) => `/locations/countries/${id}`,
      index: '/locations/countries',
    },
    index: '/locations',
    regions: {
      create: '/locations/regions/create',
      edit: (id: number) => `/locations/regions/${id}`,
      index: '/locations/regions',
    },
    states: {
      create: '/locations/states/create',
      edit: (id: number) => `/locations/states/${id}`,
      index: '/locations/states',
    },
  },
  mandatories: {
    create: '/mandatories/create',
    edit: (id: number) => `/mandatories/${id}`,
    index: '/mandatories',
  },
  media: '/media',
  operators: {
    create: '/operators/create',
    edit: (id: number) => `/operators/${id}`,
    index: '/operators',
  },
  posts: {
    create: '/posts/create',
    edit: (id: number) => `/posts/${id}`,
    index: '/posts',
  },
  promotions: {
    create: '/promotions/create',
    edit: (id: number) => `/promotions/${id}`,
    index: '/promotions',
  },
  statuses: {
    create: '/statuses/create',
    edit: (id: number) => `/statuses/${id}`,
    index: '/statuses',
  },
  types: {
    create: '/types/create',
    edit: (id: number) => `/types/${id}`,
    index: '/types',
  },
}
