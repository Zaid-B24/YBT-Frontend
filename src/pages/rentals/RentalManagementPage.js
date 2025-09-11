import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Calendar, MapPin, User, Phone, Mail, 
  CheckCircle, XCircle, Clock, Eye, Edit, Trash2 
} from 'lucide-react';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #fff;
`;

const PageSubtitle = styled.p`
  color: #ccc;
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #22c55e;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  min-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.5);
`;

const FilterControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;

  option {
    background: #333;
    color: #fff;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const BookingsTable = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 150px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 150px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #ccc;
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${props => {
    switch (props.status) {
      case 'confirmed':
        return 'background: rgba(34, 197, 94, 0.2); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3);';
      case 'pending':
        return 'background: rgba(251, 191, 36, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3);';
      case 'cancelled':
        return 'background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);';
      case 'completed':
        return 'background: rgba(59, 130, 246, 0.2); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3);';
      default:
        return 'background: rgba(255, 255, 255, 0.1); color: #ccc;';
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &.view {
    &:hover {
      background: rgba(59, 130, 246, 0.2);
      border-color: rgba(59, 130, 246, 0.3);
    }
  }

  &.edit {
    &:hover {
      background: rgba(251, 191, 36, 0.2);
      border-color: rgba(251, 191, 36, 0.3);
    }
  }

  &.delete {
    &:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.3);
    }
  }
`;

const RentalManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock rental bookings data
  const bookings = [
    {
      id: 'RNT001',
      customer: 'Rajesh Kumar',
      vehicle: 'BMW M3 Competition',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      status: 'confirmed',
      amount: '₹75,000',
      location: 'Mumbai'
    },
    {
      id: 'RNT002',
      customer: 'Priya Sharma',
      vehicle: 'Ducati Panigale V4',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      status: 'pending',
      amount: '₹8,000',
      location: 'Delhi'
    },
    {
      id: 'RNT003',
      customer: 'Arjun Patel',
      vehicle: 'Luxury Nomad Elite 35',
      startDate: '2024-01-10',
      endDate: '2024-01-17',
      status: 'completed',
      amount: '₹84,000',
      location: 'Bangalore'
    },
    {
      id: 'RNT004',
      customer: 'Sneha Reddy',
      vehicle: 'Porsche 911 Carrera',
      startDate: '2024-01-22',
      endDate: '2024-01-25',
      status: 'cancelled',
      amount: '₹54,000',
      location: 'Chennai'
    },
    {
      id: 'RNT005',
      customer: 'Vikram Singh',
      vehicle: 'Kawasaki Ninja H2',
      startDate: '2024-01-25',
      endDate: '2024-01-27',
      status: 'confirmed',
      amount: '₹20,000',
      location: 'Pune'
    }
  ];

  const stats = [
    { label: 'Total Bookings', value: '127' },
    { label: 'Active Rentals', value: '23' },
    { label: 'Pending Approval', value: '8' },
    { label: 'Monthly Revenue', value: '₹12.5L' }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewBooking = (id) => {
    console.log('View booking:', id);
  };

  const handleEditBooking = (id) => {
    console.log('Edit booking:', id);
  };

  const handleDeleteBooking = (id) => {
    console.log('Delete booking:', id);
  };

  return (
    <PageWrapper>
      <Container>
        <PageHeader>
          <PageTitle>Rental Management</PageTitle>
          <PageSubtitle>
            Manage all vehicle rental bookings, track payments, and monitor fleet utilization
          </PageSubtitle>
        </PageHeader>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <ControlsSection>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterControls>
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </FilterSelect>

            <FilterSelect
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </FilterSelect>
          </FilterControls>
        </ControlsSection>

        <BookingsTable>
          <TableHeader>
            <div>Booking ID</div>
            <div>Customer</div>
            <div>Vehicle</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div>Actions</div>
          </TableHeader>

          {filteredBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <strong style={{ color: '#fff' }}>{booking.id}</strong>
              </TableCell>
              <TableCell>
                <div>
                  <div style={{ color: '#fff', marginBottom: '0.2rem' }}>
                    {booking.customer}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#999' }}>
                    <MapPin size={12} style={{ marginRight: '0.3rem', display: 'inline' }} />
                    {booking.location}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div style={{ color: '#fff' }}>{booking.vehicle}</div>
              </TableCell>
              <TableCell>
                <div>
                  <div style={{ color: '#fff', marginBottom: '0.2rem' }}>
                    {booking.startDate}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#999' }}>
                    to {booking.endDate}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={booking.status}>
                  {booking.status}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <strong style={{ color: '#22c55e' }}>{booking.amount}</strong>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ActionButton 
                    className="view"
                    onClick={() => handleViewBooking(booking.id)}
                    title="View Details"
                  >
                    <Eye size={14} />
                  </ActionButton>
                  <ActionButton 
                    className="edit"
                    onClick={() => handleEditBooking(booking.id)}
                    title="Edit Booking"
                  >
                    <Edit size={14} />
                  </ActionButton>
                  <ActionButton 
                    className="delete"
                    onClick={() => handleDeleteBooking(booking.id)}
                    title="Delete Booking"
                  >
                    <Trash2 size={14} />
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </BookingsTable>

        {filteredBookings.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#666',
            fontSize: '1.1rem'
          }}>
            No bookings found matching your criteria.
          </div>
        )}
      </Container>
    </PageWrapper>
  );
};

export default RentalManagementPage; 