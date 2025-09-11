import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Car, 
  DollarSign, 
  Calendar,
  Eye,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #fff;
  padding-top: 80px;
`;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
`;

const PageTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff, #ccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
`;

const PageSubtitle = styled.p`
  color: rgba(255,255,255,0.7);
  font-size: 1.2rem;
  margin-bottom: 0;
  font-weight: 300;
`;

const ControlsSection = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterButton = styled.button`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.8);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ExportButton = styled.button`
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  border: none;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(255, 68, 68, 0.4);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    border-color: rgba(255,255,255,0.15);
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
  background: ${props => props.color};
  color: #fff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
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
  color: rgba(255,255,255,0.6);
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
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  font-weight: 500;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }
`;

const ChartTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
  letter-spacing: 1px;
`;

const ChartPlaceholder = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  border: 2px dashed rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5);
  font-size: 1.2rem;
  font-weight: 300;
`;

const TopItemsSection = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }
`;

const TopItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TopItemCard = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255,255,255,0.1);
  }
`;

const TopItemTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TopItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.05);
`;

const TopItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TopItemRank = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => {
    switch (props.rank) {
      case 1: return 'linear-gradient(135deg, #ffd700, #ffed4e)';
      case 2: return 'linear-gradient(135deg, #c0c0c0, #e5e5e5)';
      case 3: return 'linear-gradient(135deg, #cd7f32, #daa520)';
      default: return 'rgba(255,255,255,0.1)';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: ${props => props.rank <= 3 ? '#000' : 'rgba(255,255,255,0.7)'};
`;

const TopItemName = styled.div`
  font-weight: 500;
  color: rgba(255,255,255,0.9);
`;

const TopItemValue = styled.div`
  font-weight: 600;
  color: #ff4444;
`;

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    {
      title: 'Total Revenue',
      value: '$1,250,000',
      change: '+12.5%',
      positive: true,
      icon: DollarSign,
      color: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      title: 'Total Users',
      value: '12,847',
      change: '+8.2%',
      positive: true,
      icon: Users,
      color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    {
      title: 'Total Cars',
      value: '1,289',
      change: '+15.7%',
      positive: true,
      icon: Car,
      color: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.8%',
      positive: false,
      icon: TrendingUp,
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    }
  ];

  const topCars = [
    { name: 'Ferrari 488 GTB', views: 1247, revenue: 250000 },
    { name: 'Lamborghini Huracán', views: 892, revenue: 320000 },
    { name: 'Porsche 911 GT3 RS', views: 1567, revenue: 180000 },
    { name: 'McLaren 720S', views: 634, revenue: 450000 },
    { name: 'Aston Martin DB11', views: 456, revenue: 280000 }
  ];

  const topUsers = [
    { name: 'John Doe', purchases: 15, totalSpent: 125000 },
    { name: 'Jane Smith', purchases: 12, totalSpent: 98000 },
    { name: 'Mike Johnson', purchases: 8, totalSpent: 75000 },
    { name: 'Sarah Wilson', purchases: 6, totalSpent: 62000 },
    { name: 'David Brown', purchases: 4, totalSpent: 45000 }
  ];

  const topLocations = [
    { name: 'Los Angeles, CA', users: 1247, revenue: 450000 },
    { name: 'New York, NY', users: 892, revenue: 380000 },
    { name: 'Miami, FL', users: 756, revenue: 320000 },
    { name: 'Chicago, IL', users: 634, revenue: 280000 },
    { name: 'Las Vegas, NV', users: 456, revenue: 220000 }
  ];

  return (
    <PageWrapper>
      <AdminNav />
      <PageContainer>
        <PageHeader>
          <PageTitle>Analytics Dashboard</PageTitle>
          <PageSubtitle>Comprehensive insights into your YBT platform performance</PageSubtitle>
        </PageHeader>

        <ControlsSection>
          <ControlsRow>
            <FilterButton>
              <Filter size={20} />
              Last 30 Days
            </FilterButton>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <FilterButton>
                <RefreshCw size={20} />
                Refresh
              </FilterButton>
              <ExportButton>
                <Download size={20} />
                Export Report
              </ExportButton>
            </div>
          </ControlsRow>
        </ControlsSection>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatHeader>
                <div>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.title}</StatLabel>
                </div>
                <StatIcon color={stat.color}>
                  <stat.icon size={28} />
                </StatIcon>
              </StatHeader>
              <StatChange positive={stat.positive}>
                {stat.positive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                {stat.change} from last month
              </StatChange>
            </StatCard>
          ))}
        </StatsGrid>

        <ChartsGrid>
          <ChartCard>
            <ChartTitle>
              <BarChart3 size={28} />
              Revenue Trends
            </ChartTitle>
            <ChartPlaceholder>
              Interactive Revenue Chart - Coming Soon
            </ChartPlaceholder>
          </ChartCard>

          <ChartCard>
            <ChartTitle>
              <Users size={28} />
              User Growth
            </ChartTitle>
            <ChartPlaceholder>
              Interactive User Growth Chart - Coming Soon
            </ChartPlaceholder>
          </ChartCard>
        </ChartsGrid>

        <TopItemsSection>
          <ChartTitle>
            <Star size={28} />
            Top Performers
          </ChartTitle>
          <TopItemsGrid>
            <TopItemCard>
              <TopItemTitle>
                <Car size={24} />
                Top Cars by Views
              </TopItemTitle>
              <TopItemList>
                {topCars.map((car, index) => (
                  <TopItem key={index}>
                    <TopItemInfo>
                      <TopItemRank rank={index + 1}>{index + 1}</TopItemRank>
                      <TopItemName>{car.name}</TopItemName>
                    </TopItemInfo>
                    <TopItemValue>{car.views.toLocaleString()} views</TopItemValue>
                  </TopItem>
                ))}
              </TopItemList>
            </TopItemCard>

            <TopItemCard>
              <TopItemTitle>
                <Users size={24} />
                Top Users by Purchases
              </TopItemTitle>
              <TopItemList>
                {topUsers.map((user, index) => (
                  <TopItem key={index}>
                    <TopItemInfo>
                      <TopItemRank rank={index + 1}>{index + 1}</TopItemRank>
                      <TopItemName>{user.name}</TopItemName>
                    </TopItemInfo>
                    <TopItemValue>{user.purchases} purchases</TopItemValue>
                  </TopItem>
                ))}
              </TopItemList>
            </TopItemCard>

            <TopItemCard>
              <TopItemTitle>
                <MapPin size={24} />
                Top Locations
              </TopItemTitle>
              <TopItemList>
                {topLocations.map((location, index) => (
                  <TopItem key={index}>
                    <TopItemInfo>
                      <TopItemRank rank={index + 1}>{index + 1}</TopItemRank>
                      <TopItemName>{location.name}</TopItemName>
                    </TopItemInfo>
                    <TopItemValue>${location.revenue.toLocaleString()}</TopItemValue>
                  </TopItem>
                ))}
              </TopItemList>
            </TopItemCard>
          </TopItemsGrid>
        </TopItemsSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default AnalyticsPage; 