class AlertaCritico {
  constructor() {
    this.nombre_de_cliente = null;
    this.descripcion = null;
    this.presupuesto = 0;
    this.total_gastado = 0;
  }
}

class AlertaAdvertencia {
  constructor() {
    this.nombre_de_cliente = null;
    this.descripcion = null;
    this.porcentaje_gastado_del_total = 0;
    this.total_disponible = 0;
  }
}

class AlertaVelocidadDeGasto {
  constructor() {
    this.nombre_de_cliente = null;
    this.descripcion = null;
    this.porcentaje_de_plata_consumido = 0;
    this.porcentaje_de_periodo_usado = 0;
  }
}

class AlertaClienteSinGasto {
  constructor() {
    this.nombre_de_cliente = null;
    this.descripcion = null;
    this.porcentaje_del_total_gastado = 0;
    this.total_disponible = 0;
  }
}

export class CampanaActiva {
  constructor() {
    this.nombre_de_cliente = null;
    this.total_gastado = 0;
    this.presupuesto_asignado = 0;
  }
}

export class PresupuestoDashboard {
  constructor() {
    this.presupuesto_total = 0;
    this.total_gastado = 0;
    this.porcentaje_de_total_gastado = 0;
    this.total_disponible = 0;
    this.cantidad_de_campana_activas = 0;
    this.total_de_leads = 0;

    this.alerta_critico = new AlertaCritico();
    this.alerta_advertencia = new AlertaAdvertencia();
    this.alerta_velocidad_de_gasto = new AlertaVelocidadDeGasto();
    this.alerta_cliente_sin_gasto = new AlertaClienteSinGasto();

    this.campanas_activas = [];
  }
}