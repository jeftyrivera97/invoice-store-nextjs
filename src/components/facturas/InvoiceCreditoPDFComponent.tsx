/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// ✅ Import correcto - usar destructuring con el nombre exacto
const { NumerosALetras } = require("numero-a-letras");

// Estilos optimizados para impresora térmica 57mm
const styles = StyleSheet.create({
  page: {
    width: "57mm", // ✅ Ancho exacto del papel térmico
    padding: "2mm", // ✅ Padding mínimo
    fontFamily: "Helvetica",
    fontSize: 8, // ✅ Fuente pequeña para papel angosto
    flexDirection: "column",
  },
  // Header compacto
  header: {
    alignItems: "center",
    marginBottom: "3mm",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    paddingBottom: "2mm",
  },
  companyName: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1mm",
  },
  companyInfo: {
    fontSize: 6,
    textAlign: "center",
    marginBottom: "0.5mm",
    lineHeight: 1.1,
  },
  // Información de factura
  invoiceHeader: {
    alignItems: "center",
    marginBottom: "2mm",
    paddingVertical: "1mm",
    borderWidth: 0.5,
    borderColor: "#000",
  },
  invoiceNumber: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  invoiceDate: {
    fontSize: 7,
    textAlign: "center",
    marginTop: "0.5mm",
  },
  // Cliente
  clientSection: {
    marginBottom: "2mm",
    paddingBottom: "1mm",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  clientText: {
    fontSize: 7,
    marginBottom: "0.5mm",
  },
  // Tabla de productos
  table: {
    marginBottom: "2mm",
  },
  tableHeader: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    paddingBottom: "1mm",
    marginBottom: "1mm",
  },
  tableHeaderText: {
    fontSize: 7,
    fontWeight: "bold",
    textAlign: "center",
  },
  productRow: {
    marginBottom: "1mm",
    paddingBottom: "0.5mm",
    borderBottomWidth: 0.3,
    borderBottomColor: "#ddd",
  },
  productName: {
    fontSize: 7,
    fontWeight: "bold",
    marginBottom: "0.3mm",
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productQty: {
    fontSize: 6,
    width: "20%",
  },
  productPrice: {
    fontSize: 6,
    width: "30%",
    textAlign: "center",
  },
  productTotal: {
    fontSize: 7,
    width: "30%",
    textAlign: "right",
    fontWeight: "bold",
  },
  // Totales
  totalsSection: {
    marginTop: "2mm",
    borderTopWidth: 0.5,
    borderTopColor: "#000",
    paddingTop: "1mm",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "0.5mm",
  },
  totalLabel: {
    fontSize: 7,
    width: "80%",
  },
  totalValue: {
    fontSize: 7,
    width: "35%",
    textAlign: "right",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: "1mm",
    marginTop: "1mm",
  },
  grandTotalLabel: {
    fontSize: 8,
    fontWeight: "bold",
    width: "60%",
  },
  grandTotalValue: {
    fontSize: 9,
    fontWeight: "bold",
    width: "40%",
    textAlign: "right",
  },
  // Footer
  footer: {
    marginTop: "3mm",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    paddingTop: "2mm",
    alignItems: "center",
  },
  footerText: {
    fontSize: 5,
    textAlign: "center",
    marginBottom: "0.5mm",
    lineHeight: 1.2,
  },
  thanksText: {
    fontSize: 7,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "1mm",
  },
});

interface InvoicePDFProps {
  factura: any;
  detalles: any[];
  cliente: any;
  items: any[];
  folio: any;
  empresa: any;
  tipoFactura: any;
}

export default function InvoiceCreditoPDFComponent({
  factura,
  detalles,
  cliente,
  items,
  folio,
  empresa,
  tipoFactura,
}: InvoicePDFProps) {
  // ✅ Función usando la librería correctamente
  const numeroEnLetras = (numero: number): string => {
    try {
      // ✅ Usar NumerosALetras (con mayúscula)
      const resultado = NumerosALetras(numero);

      // ✅ Reemplazar "Pesos" por "Lempiras"
      return resultado
        .replace(/Pesos/g, "LEMPIRAS")
        .replace(/Peso/g, "LEMPIRA")
        .replace(/\/100 M\.N\./g, "/100 CENTAVOS")
        .toUpperCase();
    } catch (error) {
      console.error("Error convirtiendo número a letras:", error);
      // ✅ Fallback si falla
      return `${numero.toLocaleString()} LEMPIRAS`;
    }
  };

  const formatCurrency = (amount: number) => `L ${amount.toFixed(2)}`;
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-HN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Document>
      <Page size={[162, 800]} style={styles.page}>
        {/* Header Compacto */}
        <View style={styles.header}>
          <Text style={styles.companyName}>
            {empresa?.descripcion || "Empresa"}
          </Text>
          <Text style={styles.companyInfo}>{empresa?.razon_social || ""}</Text>
          <Text style={styles.companyInfo}>
            RTN: {empresa?.codigo_empresa || ""}
          </Text>
          <Text style={styles.companyInfo}>{empresa?.direccion || ""}</Text>
          <Text style={styles.companyInfo}>Tel. {empresa?.telefono || ""}</Text>
          <Text style={styles.companyInfo}>Cel. {empresa?.celular || ""}</Text>
          <Text style={styles.companyInfo}>
            Correo: {empresa?.correo || ""}
          </Text>
          
        </View>

        {/* Info de Ticket */}
        <View style={styles.invoiceHeader}>
          <Text style={styles.invoiceNumber}>
            TICKET #{factura?.codigo_factura || "N/A"}
          </Text>
          <Text style={styles.invoiceDate}>
            {factura?.fecha ? formatDate(factura.fecha) : "N/A"}
          </Text>
          <Text style={styles.companyInfo}>Ticket de {tipoFactura}</Text>
        </View>

        {/* Cliente */}
        <View style={styles.clientSection}>
          <Text style={styles.clientText}>
            Cliente: {cliente?.descripcion || "CONSUMIDOR FINAL"}
          </Text>
        </View>

        {/* Productos */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>PRODUCTOS</Text>
          </View>

          {items?.map((item, index) => (
            <View key={index} style={styles.productRow}>
              <Text style={styles.productName}>
                {item.descripcion || "Producto"}
              </Text>
              <View style={styles.productDetails}>
                <Text style={styles.productQty}>{item.cantidad || 0} x</Text>
                <Text style={styles.productPrice}>
                  {formatCurrency(item.precio_venta || 0)}
                </Text>
                <Text style={styles.productTotal}>
                  {formatCurrency(
                    (item.cantidad || 0) * (item.precio_venta || 0)
                  )}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Totales Simplificados */}
        <View style={styles.totalsSection}>
    
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Descuentos Otorgados:</Text>
            <Text style={styles.totalValue}>
              -{formatCurrency(factura.descuentos || 0)}
            </Text>
          </View>

          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>TOTAL:</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(factura?.total || 0)}
            </Text>
          </View>
        </View>

        {/* Footer Compacto */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            VALOR EN LETRAS: {numeroEnLetras(Number(factura?.total || 0))}
          </Text>
      
          <Text style={styles.thanksText}>¡GRACIAS POR SU COMPRA!</Text>
        </View>
      </Page>
    </Document>
  );
}
