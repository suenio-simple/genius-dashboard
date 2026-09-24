export class DatosGenerales {
  constructor(data = {}) {
    this.presupuesto_total = data.presupuesto_total ?? 0;
    this.total_gastado = data.total_gastado ?? 0;
    this.porcentaje_de_total_gastado = data.porcentaje_de_total_gastado ?? 0;
    this.total_disponible = data.total_disponible ?? 0;
    this.cantidad_de_campana_activas = data.cantidad_de_campana_activas ?? 0;
    this.total_de_leads = data.total_de_leads ?? 0;
  }
}

export class AlertaCritico {
  constructor(data = {}) {
    this.nombre_de_cliente = data.nombre_de_cliente ?? null;
    this.descripcion = data.descripcion ?? null;
    this.presupuesto = data.presupuesto ?? 0;
    this.total_gastado = data.total_gastado ?? 0;
  }
}

export class AlertaAdvertencia {
  constructor(data = {}) {
    this.nombre_de_cliente = data.nombre_de_cliente ?? null;
    this.descripcion = data.descripcion ?? null;
    this.porcentaje_gastado_del_total = data.porcentaje_gastado_del_total ?? 0;
    this.total_disponible = data.total_disponible ?? 0;
  }
}

export class AlertaVelocidadDeGasto {
  constructor(data = {}) {
    this.nombre_de_cliente = data.nombre_de_cliente ?? null;
    this.descripcion = data.descripcion ?? null;
    this.porcentaje_de_plata_consumido = data.porcentaje_de_plata_consumido ?? 0;
    this.porcentaje_de_periodo_usado = data.porcentaje_de_periodo_usado ?? 0;
  }
}

export class AlertaClienteSinGasto {
  constructor(data = {}) {
    this.nombre_de_cliente = data.nombre_de_cliente ?? null;
    this.descripcion = data.descripcion ?? null;
    this.porcentaje_del_total_gastado = data.porcentaje_del_total_gastado ?? 0;
    this.total_disponible = data.total_disponible ?? 0;
  }
}

export class CampanaActiva {
  constructor(data = {}) {
    this.nombre_de_cliente = data.nombre_de_cliente ?? null;
    this.total_gastado = data.total_gastado ?? 0;
    this.presupuesto_asignado = data.presupuesto_asignado ?? 0;
  }
}
