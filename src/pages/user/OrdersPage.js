import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  Download,
  X,
  MapPin,
  Phone,
} from "lucide-react";
import jsPDF from "jspdf";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const OrdersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const OrdersHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const OrdersTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const OrdersSubtitle = styled.p`
  color: #ccc;
  font-size: 1.1rem;
`;

const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 8px;
`;

const SuccessTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const OrderInfo = styled.div`
  flex: 1;
`;

const OrderNumber = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const OrderMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: #ccc;
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

const OrderStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => {
    switch (props.status) {
      case "delivered":
        return "rgba(34, 197, 94, 0.2)";
      case "shipped":
        return "rgba(59, 130, 246, 0.2)";
      case "processing":
        return "rgba(245, 158, 11, 0.2)";
      default:
        return "rgba(156, 163, 175, 0.2)";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "delivered":
        return "#22c55e";
      case "shipped":
        return "#3b82f6";
      case "processing":
        return "#f59e0b";
      default:
        return "#9ca3af";
    }
  }};
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const OrderActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #666;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ItemDetails = styled.div`
  font-size: 0.8rem;
  color: #ccc;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  text-align: right;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.3;
`;

const EmptyTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const EmptyDescription = styled.p`
  color: #ccc;
  margin-bottom: 2rem;
`;

const ShopButton = styled(Link)`
  background: #fff;
  color: #000;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #f0f0f0;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #fff;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #ccc;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const DetailSection = styled.div`
  margin-bottom: 2rem;
`;

const DetailTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const DetailCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const DetailValue = styled.div`
  color: #fff;
  font-weight: 500;
`;

const TrackingTimeline = styled.div`
  position: relative;
  padding-left: 2rem;
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 2rem;

  &:before {
    content: "";
    position: absolute;
    left: -2rem;
    top: 0.5rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) =>
      props.completed ? "#22c55e" : "rgba(255,255,255,0.3)"};
    border: 2px solid
      ${(props) => (props.completed ? "#22c55e" : "rgba(255,255,255,0.3)")};
  }

  &:after {
    content: "";
    position: absolute;
    left: -1.5rem;
    top: 1.5rem;
    width: 2px;
    height: calc(100% - 1rem);
    background: ${(props) =>
      props.completed ? "#22c55e" : "rgba(255,255,255,0.1)"};
  }

  &:last-child:after {
    display: none;
  }
`;

const TimelineContent = styled.div`
  margin-left: 1rem;
`;

const TimelineTitle = styled.div`
  font-weight: 500;
  color: ${(props) => (props.completed ? "#22c55e" : "#fff")};
  margin-bottom: 0.25rem;
`;

const TimelineDate = styled.div`
  font-size: 0.8rem;
  color: #ccc;
`;

const InvoiceButton = styled.button`
  background: #fff;
  color: #000;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: #f0f0f0;
  }
`;

const OrdersPage = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Check if we're coming from a successful order
  useEffect(() => {
    if (location.state?.orderConfirmed) {
      setShowSuccess(true);
      // Add the new order to the list
      const newOrder = {
        id: location.state.orderNumber,
        date: new Date().toLocaleDateString(),
        status: "processing",
        total: location.state.total,
        items: [
          {
            id: 1,
            name: "Sample Item",
            size: "M",
            quantity: 1,
            price: location.state.total,
          },
        ],
      };
      setOrders((prev) => [newOrder, ...prev]);

      // Clear the success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [location.state]);

  // Sample orders data
  useEffect(() => {
    const sampleOrders = [
      {
        id: "YBT1703845234",
        date: "2024-01-15",
        status: "delivered",
        total: 2500000,
        shippingAddress: {
          name: "John Doe",
          address: "123 Main Street, Apartment 4B",
          city: "Mumbai",
          state: "Maharashtra",
          zipCode: "400001",
          phone: "+91 9876543210",
        },
        billingAddress: {
          name: "John Doe",
          address: "123 Main Street, Apartment 4B",
          city: "Mumbai",
          state: "Maharashtra",
          zipCode: "400001",
          phone: "+91 9876543210",
        },
        trackingNumber: "YBT123456789",
        items: [
          {
            id: 1,
            name: "YOUNG BOY TOYZ Premium T-Shirt",
            size: "L",
            quantity: 1,
            price: 1500000,
          },
          {
            id: 2,
            name: "Carbon Fiber Keychain",
            size: null,
            quantity: 2,
            price: 500000,
          },
        ],
      },
      {
        id: "YBT1703672834",
        date: "2024-01-10",
        status: "shipped",
        total: 5000000,
        shippingAddress: {
          name: "Jane Smith",
          address: "456 Oak Avenue",
          city: "Delhi",
          state: "Delhi",
          zipCode: "110001",
          phone: "+91 9876543211",
        },
        billingAddress: {
          name: "Jane Smith",
          address: "456 Oak Avenue",
          city: "Delhi",
          state: "Delhi",
          zipCode: "110001",
          phone: "+91 9876543211",
        },
        trackingNumber: "YBT987654321",
        items: [
          {
            id: 3,
            name: "Limited Edition Hoodie",
            size: "XL",
            quantity: 1,
            price: 3500000,
          },
          {
            id: 4,
            name: "Luxury Car Model",
            size: null,
            quantity: 1,
            price: 1500000,
          },
        ],
      },
      {
        id: "YBT1703586234",
        date: "2024-01-05",
        status: "processing",
        total: 1200000,
        shippingAddress: {
          name: "Mike Johnson",
          address: "789 Pine Street",
          city: "Bangalore",
          state: "Karnataka",
          zipCode: "560001",
          phone: "+91 9876543212",
        },
        billingAddress: {
          name: "Mike Johnson",
          address: "789 Pine Street",
          city: "Bangalore",
          state: "Karnataka",
          zipCode: "560001",
          phone: "+91 9876543212",
        },
        trackingNumber: "YBT456789123",
        items: [
          {
            id: 5,
            name: "Performance Cap",
            size: "One Size",
            quantity: 2,
            price: 600000,
          },
        ],
      },
    ];

    if (orders.length === 0 || !location.state?.orderConfirmed) {
      setOrders(sampleOrders);
    }
  }, [orders.length, location.state]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle size={16} />;
      case "shipped":
        return <Truck size={16} />;
      case "processing":
        return <Clock size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "shipped":
        return "Shipped";
      case "processing":
        return "Processing";
      default:
        return "Pending";
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleDownloadInvoice = (order) => {
    // Generate invoice data
    const invoiceData = {
      orderNumber: order.id,
      date: new Date(order.date).toLocaleDateString(),
      customerName: order.shippingAddress.name,
      items: order.items,
      subtotal: Math.round(order.total * 0.847), // Assuming 18% tax
      tax: Math.round(order.total * 0.153),
      total: order.total,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
    };

    // Create PDF
    const pdf = new jsPDF();

    // Set background color to black
    pdf.setFillColor(0, 0, 0);
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
      "F"
    );

    // Company Header
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("YOUNG BOY TOYZ", 20, 30);

    // Decorative elements (similar to website theme)
    pdf.setTextColor(200, 200, 200);
    pdf.setFontSize(12);
    pdf.text("≡", 15, 30);
    pdf.text("≡", 180, 30);

    // Invoice title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "normal");
    pdf.text("INVOICE", 20, 50);

    // Invoice details
    pdf.setFontSize(10);
    pdf.setTextColor(200, 200, 200);
    pdf.text(`Invoice Number: INV-${invoiceData.orderNumber}`, 20, 65);
    pdf.text(`Order Number: ${invoiceData.orderNumber}`, 20, 75);
    pdf.text(`Date: ${invoiceData.date}`, 20, 85);

    // Company details (right side)
    pdf.setTextColor(200, 200, 200);
    pdf.text("YOUNG BOY TOYZ Private Limited", 120, 65);
    pdf.text("123, Luxury Plaza, Bandra Kurla Complex", 120, 75);
    pdf.text("Mumbai, Maharashtra 400051, India", 120, 85);
    pdf.text("GST: 27AABCY1234L1ZZ", 120, 95);

    // Horizontal line
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.line(20, 105, 190, 105);

    // Bill To section
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("BILL TO:", 20, 120);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(200, 200, 200);
    pdf.text(invoiceData.customerName, 20, 135);
    pdf.text(invoiceData.shippingAddress.address, 20, 145);
    pdf.text(
      `${invoiceData.shippingAddress.city}, ${invoiceData.shippingAddress.state} ${invoiceData.shippingAddress.zipCode}`,
      20,
      155
    );
    pdf.text(`Phone: ${invoiceData.shippingAddress.phone}`, 20, 165);

    // Items header
    let yPosition = 185;
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("ITEMS:", 20, yPosition);

    // Items table header
    yPosition += 15;
    pdf.setFontSize(10);
    pdf.setTextColor(200, 200, 200);
    pdf.text("Description", 20, yPosition);
    pdf.text("Qty", 120, yPosition);
    pdf.text("Unit Price", 140, yPosition);
    pdf.text("Total", 170, yPosition);

    // Horizontal line under header
    pdf.line(20, yPosition + 5, 190, yPosition + 5);

    // Items
    yPosition += 15;
    invoiceData.items.forEach((item) => {
      const itemName = item.name + (item.size ? ` (Size: ${item.size})` : "");
      const unitPrice = `₹${item.price.toLocaleString()}`;
      const totalPrice = `₹${(item.price * item.quantity).toLocaleString()}`;

      pdf.setTextColor(200, 200, 200);
      pdf.text(itemName, 20, yPosition);
      pdf.text(item.quantity.toString(), 120, yPosition);
      pdf.text(unitPrice, 140, yPosition);
      pdf.text(totalPrice, 170, yPosition);
      yPosition += 12;
    });

    // Summary section
    yPosition += 10;
    pdf.line(120, yPosition, 190, yPosition);
    yPosition += 10;

    pdf.setTextColor(200, 200, 200);
    pdf.text("Subtotal:", 120, yPosition);
    pdf.text(`₹${invoiceData.subtotal.toLocaleString()}`, 170, yPosition);
    yPosition += 12;

    pdf.text("Tax (GST 18%):", 120, yPosition);
    pdf.text(`₹${invoiceData.tax.toLocaleString()}`, 170, yPosition);
    yPosition += 12;

    // Total line
    pdf.line(120, yPosition, 190, yPosition);
    yPosition += 10;

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("TOTAL:", 120, yPosition);
    pdf.text(`₹${invoiceData.total.toLocaleString()}`, 170, yPosition);

    // Footer
    yPosition += 30;
    pdf.setTextColor(200, 200, 200);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text("Thank you for your business!", 20, yPosition);
    pdf.text(
      "For any queries, contact us at: info@youngboytoyz.com | +91 9876543210",
      20,
      yPosition + 12
    );

    // Add subtle border
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.rect(
      10,
      10,
      pdf.internal.pageSize.width - 20,
      pdf.internal.pageSize.height - 20
    );

    // Save the PDF
    pdf.save(`YBT-Invoice-${order.id}.pdf`);
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { title: "Order Placed", date: "Order confirmed", completed: true },
      {
        title: "Processing",
        date: "Preparing your order",
        completed: status !== "processing",
      },
      {
        title: "Shipped",
        date: "On the way",
        completed: status === "delivered" || status === "shipped",
      },
      {
        title: "Delivered",
        date: "Order delivered",
        completed: status === "delivered",
      },
    ];
    return steps;
  };

  if (orders.length === 0 && !showSuccess) {
    return (
      <PageWrapper>
        <OrdersContainer>
          <OrdersHeader>
            <OrdersTitle>My Orders</OrdersTitle>
            <OrdersSubtitle>Track and manage your orders</OrdersSubtitle>
          </OrdersHeader>

          <EmptyState>
            <EmptyIcon>📦</EmptyIcon>
            <EmptyTitle>No Orders Yet</EmptyTitle>
            <EmptyDescription>
              You haven't placed any orders yet. Start shopping to see your
              orders here.
            </EmptyDescription>
            <ShopButton to="/merchandise">Start Shopping</ShopButton>
          </EmptyState>
        </OrdersContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <OrdersContainer>
        <OrdersHeader>
          <OrdersTitle>My Orders</OrdersTitle>
          <OrdersSubtitle>Track and manage your orders</OrdersSubtitle>
        </OrdersHeader>

        {showSuccess && (
          <SuccessMessage>
            <SuccessTitle>🎉 Order Placed Successfully!</SuccessTitle>
            <p>
              Thank you for your order. You will receive a confirmation email
              shortly.
            </p>
          </SuccessMessage>
        )}

        <OrdersList>
          {orders.map((order) => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderInfo>
                  <OrderNumber>Order #{order.id}</OrderNumber>
                  <OrderMeta>
                    <span>
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </span>
                  </OrderMeta>
                </OrderInfo>

                <OrderActions>
                  <OrderStatus status={order.status}>
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </OrderStatus>

                  <ActionButton onClick={() => handleViewDetails(order)}>
                    <Eye size={14} />
                    View Details
                  </ActionButton>

                  <ActionButton onClick={() => handleDownloadInvoice(order)}>
                    <Download size={14} />
                    Invoice
                  </ActionButton>
                </OrderActions>
              </OrderHeader>

              <OrderItems>
                {order.items.map((item) => (
                  <OrderItem key={item.id}>
                    <ItemImage>IMG</ItemImage>
                    <ItemInfo>
                      <ItemName>{item.name}</ItemName>
                      <ItemDetails>
                        {item.size && `Size: ${item.size} • `}
                        Qty: {item.quantity}
                      </ItemDetails>
                    </ItemInfo>
                    <ItemPrice>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </ItemPrice>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderTotal>
                <span>Total</span>
                <span>₹{order.total.toLocaleString()}</span>
              </OrderTotal>
            </OrderCard>
          ))}
        </OrdersList>

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <ModalOverlay onClick={handleCloseDetails}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Order Details - #{selectedOrder.id}</ModalTitle>
                <CloseButton onClick={handleCloseDetails}>
                  <X size={24} />
                </CloseButton>
              </ModalHeader>

              <ModalBody>
                {/* Order Summary */}
                <DetailSection>
                  <DetailTitle>Order Summary</DetailTitle>
                  <DetailGrid>
                    <DetailCard>
                      <DetailLabel>Order Number</DetailLabel>
                      <DetailValue>{selectedOrder.id}</DetailValue>
                    </DetailCard>
                    <DetailCard>
                      <DetailLabel>Order Date</DetailLabel>
                      <DetailValue>
                        {new Date(selectedOrder.date).toLocaleDateString()}
                      </DetailValue>
                    </DetailCard>
                    <DetailCard>
                      <DetailLabel>Status</DetailLabel>
                      <DetailValue>
                        {getStatusText(selectedOrder.status)}
                      </DetailValue>
                    </DetailCard>
                    <DetailCard>
                      <DetailLabel>Tracking Number</DetailLabel>
                      <DetailValue>{selectedOrder.trackingNumber}</DetailValue>
                    </DetailCard>
                  </DetailGrid>
                </DetailSection>

                {/* Shipping Address */}
                <DetailSection>
                  <DetailTitle>Shipping Address</DetailTitle>
                  <DetailCard>
                    <DetailValue>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <MapPin size={16} />
                        {selectedOrder.shippingAddress.name}
                      </div>
                      {selectedOrder.shippingAddress.address}
                      <br />
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.state}{" "}
                      {selectedOrder.shippingAddress.zipCode}
                      <br />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        <Phone size={16} />
                        {selectedOrder.shippingAddress.phone}
                      </div>
                    </DetailValue>
                  </DetailCard>
                </DetailSection>

                {/* Order Items */}
                <DetailSection>
                  <DetailTitle>Order Items</DetailTitle>
                  <div>
                    {selectedOrder.items.map((item) => (
                      <OrderItem key={item.id}>
                        <ItemImage>IMG</ItemImage>
                        <ItemInfo>
                          <ItemName>{item.name}</ItemName>
                          <ItemDetails>
                            {item.size && `Size: ${item.size} • `}
                            Qty: {item.quantity}
                          </ItemDetails>
                        </ItemInfo>
                        <ItemPrice>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </ItemPrice>
                      </OrderItem>
                    ))}
                    <OrderTotal>
                      <span>Total</span>
                      <span>₹{selectedOrder.total.toLocaleString()}</span>
                    </OrderTotal>
                  </div>
                </DetailSection>

                {/* Order Tracking */}
                <DetailSection>
                  <DetailTitle>Order Tracking</DetailTitle>
                  <TrackingTimeline>
                    {getTrackingSteps(selectedOrder.status).map(
                      (step, index) => (
                        <TimelineItem key={index} completed={step.completed}>
                          <TimelineContent>
                            <TimelineTitle completed={step.completed}>
                              {step.title}
                            </TimelineTitle>
                            <TimelineDate>{step.date}</TimelineDate>
                          </TimelineContent>
                        </TimelineItem>
                      )
                    )}
                  </TrackingTimeline>
                </DetailSection>

                {/* Download Invoice Button */}
                <InvoiceButton
                  onClick={() => handleDownloadInvoice(selectedOrder)}
                >
                  <Download size={16} style={{ marginRight: "0.5rem" }} />
                  Download Invoice
                </InvoiceButton>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </OrdersContainer>
    </PageWrapper>
  );
};

export default OrdersPage;
