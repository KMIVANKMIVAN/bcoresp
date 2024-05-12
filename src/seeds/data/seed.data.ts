export const SEED_DEPARTMENTS = [
  {
    departamento: 'La Paz',
  },
  {
    departamento: 'Beni',
  },
  {
    departamento: 'Cochabamba',
  },
  {
    departamento: 'Chuquisaca',
  },
  {
    departamento: 'Oruro',
  },
  {
    departamento: 'Pando',
  },
  {
    departamento: 'Potosí',
  },
  {
    departamento: 'Tarija',
  },
  {
    departamento: 'Santa Cruz',
  },
];
export const SEED_AGENCIES = [
  {
    agencia: 'Agencia Central: Av. Camacho N° 1470, Esq. Bueno.',
    department_id: 1,
  },
  {
    agencia:
      'Agencia El Prado: Av. 16 de Julio N° 1660, Edif. Ex - Banco Central de Bolivia.',
    department_id: 1,
  },
  /* {
    sucursal: '',
  },*/
];
export const SEED_ROLES = [
  {
    rol: 'ADMINISTRADOR',
  },
  {
    rol: 'SUBADMINISTRADOR',
  },
  {
    rol: 'AGENTE',
  },
];
export const SEED_USRS = [
  {
    nombres: 'ADMIN',
    apellidos: 'ADMIN',
    ci: 'ADMINROOT',
    complemento: null,
    correo: 'admin@admin.aev.bo.go',
    contrasenia: 'ADMINROOT',
    es_activo: true,
    se_cambiado_cntr: true,
    roles: [1, 2, 3],
    agency_id: 1,
  },
  {
    nombres: 'ADMINLPZ',
    apellidos: 'ADMINLPZ',
    ci: 'ADMINLPZ',
    complemento: null,
    correo: 'adminlpz@adminlpz.busa.bo.go',
    contrasenia: 'ADMINLPZ',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 1,
  },
  /* {
    nombres: 'ADMINCBBA',
    apellidos: 'ADMINCBBA',
    ci: 'ADMINCBBA',
    complemento: null,
    correo: 'admincbba@admincbba.busa.bo.go',
    contrasenia: 'ADMINCBBA',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 2,
  },
  {
    nombres: 'ADMINSCZ',
    apellidos: 'ADMINSCZ',
    ci: 'ADMINSCZ',
    complemento: null,
    correo: 'adminscz@adminscz.busa.bo.go',
    contrasenia: 'ADMINSCZ',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 16,
  },
  {
    nombres: 'ADMINORU',
    apellidos: 'ADMINORU',
    ci: 'ADMINORU',
    complemento: null,
    correo: 'adminoru@adminoru.busa.bo.go',
    contrasenia: 'ADMINORU',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 22,
  },
  {
    nombres: 'ADMINPSI',
    apellidos: 'ADMINPSI',
    ci: 'ADMINPSI',
    complemento: null,
    correo: 'adminpsi@adminpsi.busa.bo.go',
    contrasenia: 'ADMINPSI',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 23,
  },
  {
    nombres: 'ADMINCHQ',
    apellidos: 'ADMINCHQ',
    ci: 'ADMINCHQ',
    complemento: null,
    correo: 'adminchq@adminchq.busa.bo.go',
    contrasenia: 'ADMINCHQ',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 24,
  },
  {
    nombres: 'ADMINTJA',
    apellidos: 'ADMINTJA',
    ci: 'ADMINTJA',
    complemento: null,
    correo: 'admintja@admintja.busa.bo.go',
    contrasenia: 'ADMINTJA',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 25,
  },
  {
    nombres: 'ADMINPND',
    apellidos: 'ADMINPND',
    ci: 'ADMINPND',
    complemento: null,
    correo: 'adminpnd@adminpnd.busa.bo.go',
    contrasenia: 'ADMINPND',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 26,
  },
  {
    nombres: 'ADMINBNI',
    apellidos: 'ADMINBNI',
    ci: 'ADMINBNI',
    complemento: null,
    correo: 'adminbni@adminbni.busa.bo.go',
    contrasenia: 'ADMINBNI',
    es_activo: true,
    se_cambiado_cntr: false,
    roles: [2],
    agency_id: 27,
  }, */
];