import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Users,
  Car,
  DollarSign,
  Calendar,
  Gavel,
  Settings,
  BarChart3,
  Activity,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowUpRight,
  X,
  ArrowDownRight,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import CreateEventForm from "../../components/forms/CreateEventForm";

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #fff;
  padding-top: 80px;
`;

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const ModalWrapper = styled.div`
  position: relative;
  /* This wrapper should NOT have width or height limits, 
     it just holds the card and the button */
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); /* darker black overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Card = styled.div`
  background: rgba(0, 0, 0, 1); /* darker card background */
  padding: 3rem 2.5rem;
  border-radius: 16px;
  width: 650px;
  max-width: 92vw;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.6);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.35);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StatIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
  color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #fff, #ccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${(props) => (props.positive ? "#10b981" : "#ef4444")};
  font-weight: 500;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;

  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
  letter-spacing: 1px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.02);
`;

const Td = styled.td`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${(props) => {
    switch (props.status) {
      case "active":
        return "rgba(16, 185, 129, 0.15)";
      case "pending":
        return "rgba(245, 158, 11, 0.15)";
      case "inactive":
        return "rgba(239, 68, 68, 0.15)";
      default:
        return "rgba(107, 114, 128, 0.15)";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "active":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "inactive":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }};
  border: 1px solid
    ${(props) => {
      switch (props.status) {
        case "active":
          return "rgba(16, 185, 129, 0.3)";
        case "pending":
          return "rgba(245, 158, 11, 0.3)";
        case "inactive":
          return "rgba(239, 68, 68, 0.3)";
        default:
          return "rgba(107, 114, 128, 0.3)";
      }
    }};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SideCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;

  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
`;

const QuickAction = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(255, 68, 68, 0.4);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const RecentActivity = styled.div`
  margin-top: 1.5rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;

  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
`;

const ChartPlaceholder = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  font-weight: 300;
`;

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 125000,
    totalUsers: 0,
    totalVehicles: 0,
    totalEvents: 0,
    revenueChange: 12.5,
    usersChange: 8.2,
    carsChange: -2.1,
    eventsChange: 15.7,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          console.error("Admin token not found. Please log in.");
          return;
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [vehicleResponse, eventResponse, userResponse] =
          await Promise.all([
            fetch(`${process.env.REACT_APP_API_URL}/vehicles/count`, {
              headers,
            }),
            fetch(`${process.env.REACT_APP_API_URL}/events/totaleventscount`, {
              headers,
            }),
            fetch(`${process.env.REACT_APP_API_URL}/users/totalusers`, {
              headers,
            }),
          ]);

        if (!vehicleResponse.ok || !eventResponse.ok) {
          throw new Error("A network response was not ok");
        }

        const [vehicleData, eventData, userData] = await Promise.all([
          vehicleResponse.json(),
          eventResponse.json(),
          userResponse.json(),
        ]);

        // Update state once with all the new data
        setStats((prevStats) => ({
          ...prevStats,
          totalVehicles: vehicleData.data.totalVehicles,
          totalEvents: eventData.data.totalEvents,
          totalUsers: userData.data.totalUsers,
        }));
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  const [recentCars] = useState([
    {
      id: 1,
      name: "Ferrari 488 GTB",
      status: "active",
      price: 250000,
      views: 1247,
    },
    {
      id: 2,
      name: "Lamborghini Huracán",
      status: "pending",
      price: 320000,
      views: 892,
    },
    {
      id: 3,
      name: "Porsche 911 GT3 RS",
      status: "active",
      price: 180000,
      views: 1567,
    },
    {
      id: 4,
      name: "McLaren 720S",
      status: "inactive",
      price: 450000,
      views: 634,
    },
  ]);

  const [recentEvents] = useState([
    {
      id: 1,
      name: "Luxury Car Show 2024",
      date: "2024-03-15",
      attendees: 250,
      status: "upcoming",
    },
    {
      id: 2,
      name: "Auction Night",
      date: "2024-03-10",
      attendees: 180,
      status: "completed",
    },
    {
      id: 3,
      name: "VIP Test Drive Event",
      date: "2024-03-20",
      attendees: 75,
      status: "upcoming",
    },
  ]);

  const [recentAuctions] = useState([
    {
      id: 1,
      name: "Rare Ferrari F40",
      currentBid: 850000,
      bidders: 12,
      status: "live",
    },
    {
      id: 2,
      name: "Classic Porsche 959",
      currentBid: 1200000,
      bidders: 8,
      status: "ending",
    },
    {
      id: 3,
      name: "Lamborghini Countach",
      currentBid: 650000,
      bidders: 15,
      status: "live",
    },
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      action: "New car added",
      item: "Ferrari 488 GTB",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Auction started",
      item: "Rare Ferrari F40",
      time: "4 hours ago",
    },
    {
      id: 3,
      action: "User registered",
      item: "john.doe@email.com",
      time: "6 hours ago",
    },
    {
      id: 4,
      action: "Event created",
      item: "Luxury Car Show 2024",
      time: "1 day ago",
    },
  ]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setActiveOverlay(null);
    }
  };

  const [activeOverlay, setActiveOverlay] = useState(null);

  return (
    <DashboardWrapper>
      {activeOverlay && (
        <Overlay onClick={handleOverlayClick}>
          <ModalWrapper>
            <CloseButton
              onClick={() => {
                setActiveOverlay(null);
              }}
            >
              <X size={20} />
            </CloseButton>
            <Card>
              {/* {activeOverlay === "addVehicle" && (
                <AddVehicleFlow onSuccess={() => setActiveOverlay(null)} />
              )} */}
              {activeOverlay === "createEvent" && (
                <CreateEventForm onSuccess={() => setActiveOverlay(null)} />
              )}
            </Card>
          </ModalWrapper>
        </Overlay>
      )}
      <DashboardContainer>
        <StatsGrid>
          <StatCard>
            <StatHeader>
              <div>
                <StatValue>${stats.totalRevenue.toLocaleString()}</StatValue>
                <StatLabel>Total Revenue</StatLabel>
              </div>
              <StatIcon color="linear-gradient(135deg, #10b981, #059669)">
                <DollarSign size={28} />
              </StatIcon>
            </StatHeader>
            <StatChange positive={stats.revenueChange > 0}>
              {stats.revenueChange > 0 ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}
              {Math.abs(stats.revenueChange)}% from last month
            </StatChange>
          </StatCard>

          <StatCard>
            <StatHeader>
              <div>
                <StatValue>{stats.totalUsers}</StatValue>
                <StatLabel>Total Users</StatLabel>
              </div>
              <StatIcon color="linear-gradient(135deg, #3b82f6, #1d4ed8)">
                <Users size={28} />
              </StatIcon>
            </StatHeader>
            <StatChange positive={stats.usersChange > 0}>
              {stats.usersChange > 0 ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}
              {Math.abs(stats.usersChange)}% from last month
            </StatChange>
          </StatCard>

          <StatCard>
            <StatHeader>
              <div>
                <StatValue>{stats.totalVehicles}</StatValue>
                <StatLabel>Total Vehicle</StatLabel>
              </div>
              <StatIcon color="linear-gradient(135deg, #f59e0b, #d97706)">
                <Car size={28} />
              </StatIcon>
            </StatHeader>
            <StatChange positive={stats.carsChange > 0}>
              {stats.carsChange > 0 ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}
              {Math.abs(stats.carsChange)}% from last month
            </StatChange>
          </StatCard>

          <StatCard>
            <StatHeader>
              <div>
                <StatValue>{stats.totalEvents}</StatValue>
                <StatLabel>Active Events</StatLabel>
              </div>
              <StatIcon color="linear-gradient(135deg, #8b5cf6, #7c3aed)">
                <Calendar size={28} />
              </StatIcon>
            </StatHeader>
            <StatChange positive={stats.eventsChange > 0}>
              {stats.eventsChange > 0 ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownRight size={18} />
              )}
              {Math.abs(stats.eventsChange)}% from last month
            </StatChange>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <MainSection>
            <SectionTitle>
              <Car size={28} />
              Recent Cars
            </SectionTitle>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th>Car</Th>
                    <Th>Status</Th>
                    <Th>Price</Th>
                    <Th>Views</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {recentCars.map((car) => (
                    <tr key={car.id}>
                      <Td>
                        <div style={{ fontWeight: 600 }}>{car.name}</div>
                      </Td>
                      <Td>
                        <StatusBadge status={car.status}>
                          {car.status}
                        </StatusBadge>
                      </Td>
                      <Td>${car.price.toLocaleString()}</Td>
                      <Td>{car.views.toLocaleString()}</Td>
                      <Td>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <ActionButton title="View">
                            <Eye size={18} />
                          </ActionButton>
                          <ActionButton title="Edit">
                            <Edit size={18} />
                          </ActionButton>
                          <ActionButton title="Delete">
                            <Trash2 size={18} />
                          </ActionButton>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </MainSection>

          <Sidebar>
            <SideCard>
              <SectionTitle>
                <Settings size={24} />
                Quick Actions
              </SectionTitle>

              {/* <QuickAction
                onClick={() => {
                  setActiveOverlay("addVehicle");
                }}
              >
                <Plus size={20} />
                Add New Vehicle
              </QuickAction> */}
              <QuickAction
                onClick={() => {
                  setActiveOverlay("createEvent");
                }}
              >
                <Calendar size={20} />
                Create Event
              </QuickAction>
              <QuickAction>
                <Gavel size={20} />
                Start Auction
              </QuickAction>
              <QuickAction>
                <Users size={20} />
                Manage Users
              </QuickAction>
            </SideCard>

            <SideCard>
              <SectionTitle>
                <Activity size={24} />
                Recent Activity
              </SectionTitle>
              <RecentActivity>
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id}>
                    <ActivityIcon>
                      <Activity size={18} />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityText>
                        {activity.action}: {activity.item}
                      </ActivityText>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </RecentActivity>
            </SideCard>
          </Sidebar>
        </ContentGrid>

        <ContentGrid>
          <MainSection>
            <SectionTitle>
              <Calendar size={28} />
              Upcoming Events
            </SectionTitle>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th>Event</Th>
                    <Th>Date</Th>
                    <Th>Attendees</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((event) => (
                    <tr key={event.id}>
                      <Td>
                        <div style={{ fontWeight: 600 }}>{event.name}</div>
                      </Td>
                      <Td>{new Date(event.date).toLocaleDateString()}</Td>
                      <Td>{event.attendees}</Td>
                      <Td>
                        <StatusBadge
                          status={
                            event.status === "upcoming" ? "active" : "pending"
                          }
                        >
                          {event.status}
                        </StatusBadge>
                      </Td>
                      <Td>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <ActionButton title="View">
                            <Eye size={18} />
                          </ActionButton>
                          <ActionButton title="Edit">
                            <Edit size={18} />
                          </ActionButton>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </MainSection>

          <MainSection>
            <SectionTitle>
              <Gavel size={28} />
              Live Auctions
            </SectionTitle>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th>Item</Th>
                    <Th>Current Bid</Th>
                    <Th>Bidders</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {recentAuctions.map((auction) => (
                    <tr key={auction.id}>
                      <Td>
                        <div style={{ fontWeight: 600 }}>{auction.name}</div>
                      </Td>
                      <Td>${auction.currentBid.toLocaleString()}</Td>
                      <Td>{auction.bidders}</Td>
                      <Td>
                        <StatusBadge
                          status={
                            auction.status === "live" ? "active" : "pending"
                          }
                        >
                          {auction.status}
                        </StatusBadge>
                      </Td>
                      <Td>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <ActionButton title="View">
                            <Eye size={18} />
                          </ActionButton>
                          <ActionButton title="Manage">
                            <Settings size={18} />
                          </ActionButton>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          </MainSection>
        </ContentGrid>

        <ChartContainer>
          <SectionTitle>
            <BarChart3 size={28} />
            Revenue Analytics
          </SectionTitle>
          <ChartPlaceholder>
            Interactive Revenue Chart - Coming Soon
          </ChartPlaceholder>
        </ChartContainer>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default AdminDashboard;
