'use client';

import { Card, Statistic, Row, Col, Table, Tag } from 'antd';
import { orders } from '@/data/orders';
import { products, categories } from '@/data/products';

export default function AdminDashboard() {
  // Calculate statistics
  const totalOrders = orders.length;

  // Calculate revenue based on product names in orders
  const totalRevenue = orders.reduce((sum, order) => {
    const product = products.find((p) => p.name === order.productName);
    return sum + (product?.price || 0);
  }, 0);

  const totalProducts = products.length;
  const totalCategories = categories.length - 1; // Exclude "All"

  // Category breakdown with order counts
  const categoryBreakdown = categories
    .filter((cat) => cat !== 'All')
    .map((cat) => {
      const productCount = products.filter((p) => p.category === cat).length;
      const orderCount = orders.filter((o) =>
        products.find((p) => p.name === o.productName)?.category === cat
      ).length;
      const categoryRevenue = orders
        .filter((o) => products.find((p) => p.name === o.productName)?.category === cat)
        .reduce((sum, o) => {
          const product = products.find((p) => p.name === o.productName);
          return sum + (product?.price || 0);
        }, 0);
      return {
        category: cat,
        productCount,
        orderCount,
        revenue: categoryRevenue,
      };
    });

  // Orders by status
  const ordersByStatus = {
    pending: orders.filter((o) => o.status === 'Processing').length,
    shipped: orders.filter((o) => o.status === 'Shipped').length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
  };

  // Recent orders
  const recentOrdersColumns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === 'Delivered') color = 'green';
        if (status === 'Shipped') color = 'blue';
        if (status === 'Processing') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.5rem' }}>
      {/* Statistics Row */}
      <Row gutter={[24, 24]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ border: '1px solid #1A1A1A/10', backgroundColor: '#F8F5F0' }}>
            <Statistic
              title="Total Orders"
              value={totalOrders}
              valueStyle={{ color: '#1A1A1A', fontFamily: "'Playfair Display', serif" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ border: '1px solid #1A1A1A/10', backgroundColor: '#F8F5F0' }}>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix="$"
              valueStyle={{ color: '#1A1A1A', fontFamily: "'Playfair Display', serif" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ border: '1px solid #1A1A1A/10', backgroundColor: '#F8F5F0' }}>
            <Statistic
              title="Total Products"
              value={totalProducts}
              valueStyle={{ color: '#1A1A1A', fontFamily: "'Playfair Display', serif" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ border: '1px solid #1A1A1A/10', backgroundColor: '#F8F5F0' }}>
            <Statistic
              title="Categories"
              value={totalCategories}
              valueStyle={{ color: '#1A1A1A', fontFamily: "'Playfair Display', serif" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Order Status Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} sm={8}>
          <Card style={{ border: '1px solid #1A1A1A/10', textAlign: 'center' }}>
            <div style={{ color: '#8B7355', fontSize: '1.25rem', fontWeight: 600 }}>
              {ordersByStatus.pending}
            </div>
            <div style={{ color: '#1A1A1A/60', fontSize: '0.875rem' }}>Pending Orders</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ border: '1px solid #1A1A1A/10', textAlign: 'center' }}>
            <div style={{ color: '#1A7CCF', fontSize: '1.25rem', fontWeight: 600 }}>
              {ordersByStatus.shipped}
            </div>
            <div style={{ color: '#1A1A1A/60', fontSize: '0.875rem' }}>Shipped Orders</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ border: '1px solid #1A1A1A/10', textAlign: 'center' }}>
            <div style={{ color: '#52C41A', fontSize: '1.25rem', fontWeight: 600 }}>
              {ordersByStatus.delivered}
            </div>
            <div style={{ color: '#1A1A1A/60', fontSize: '0.875rem' }}>Delivered Orders</div>
          </Card>
        </Col>
      </Row>

      {/* Category Performance */}
      <Row gutter={[24, 24]} style={{ marginBottom: '2rem' }}>
        <Col xs={24}>
          <Card style={{ border: '1px solid #1A1A1A/10' }}>
            <h3 style={{ color: '#1A1A1A', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
              Category Performance
            </h3>
            <Table
              columns={[
                { title: 'Category', dataIndex: 'category', key: 'category' },
                { title: 'Products', dataIndex: 'productCount', key: 'productCount' },
                { title: 'Orders', dataIndex: 'orderCount', key: 'orderCount' },
                { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (v) => `$${v}` },
              ]}
              dataSource={categoryBreakdown.map((c, i) => ({ ...c, key: i }))}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Card style={{ border: '1px solid #1A1A1A/10' }}>
        <h3 style={{ color: '#1A1A1A', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
          Recent Orders
        </h3>
        <Table
          columns={recentOrdersColumns}
          dataSource={recentOrders.map((o) => ({ ...o, key: o.id }))}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
}
