import { PresupuestoDashboard, CampanaActiva } from './dashboard.dto';

export function mock() {
    const dashboard = new PresupuestoDashboard();

    // Datos generales
    dashboard.presupuesto_total = 100000;
    dashboard.total_gastado = 65000;
    dashboard.porcentaje_de_total_gastado = 65;
    dashboard.total_disponible = 35000;
    dashboard.cantidad_de_campana_activas = 3;
    dashboard.total_de_leads = 1250;

    // Alerta crítico
    dashboard.alerta_critico.nombre_de_cliente = "Cliente A";
    dashboard.alerta_critico.descripcion = "El presupuesto está próximo a agotarse";
    dashboard.alerta_critico.presupuesto = 20000;
    dashboard.alerta_critico.total_gastado = 19000;

    // Alerta advertencia
    dashboard.alerta_advertencia.nombre_de_cliente = "Cliente B";
    dashboard.alerta_advertencia.descripcion = "El cliente está utilizando gran parte del presupuesto";
    dashboard.alerta_advertencia.porcentaje_gastado_del_total = 80;
    dashboard.alerta_advertencia.total_disponible = 5000;

    // Alerta velocidad de gasto
    dashboard.alerta_velocidad_de_gasto.nombre_de_cliente = "Cliente C";
    dashboard.alerta_velocidad_de_gasto.descripcion = "El gasto está avanzando más rápido que el período";
    dashboard.alerta_velocidad_de_gasto.porcentaje_de_plata_consumido = 75;
    dashboard.alerta_velocidad_de_gasto.porcentaje_de_periodo_usado = 50;

    // Cliente sin gasto
    dashboard.alerta_cliente_sin_gasto.nombre_de_cliente = "Cliente D";
    dashboard.alerta_cliente_sin_gasto.descripcion = "El cliente todavía no registra gastos";
    dashboard.alerta_cliente_sin_gasto.porcentaje_del_total_gastado = 0;
    dashboard.alerta_cliente_sin_gasto.total_disponible = 15000;

    // Campañas activas
    const campana1 = new CampanaActiva();
    campana1.nombre_de_cliente = "Cliente A";
    campana1.total_gastado = 19000;
    campana1.presupuesto_asignado = 20000;

    const campana2 = new CampanaActiva();
    campana2.nombre_de_cliente = "Cliente B";
    campana2.total_gastado = 16000;
    campana2.presupuesto_asignado = 25000;

    const campana3 = new CampanaActiva();
    campana3.nombre_de_cliente = "Cliente C";
    campana3.total_gastado = 12000;
    campana3.presupuesto_asignado = 20000;

    dashboard.campanas_activas.push(campana1);
    dashboard.campanas_activas.push(campana2);
    dashboard.campanas_activas.push(campana3);

    return dashboard;
  }