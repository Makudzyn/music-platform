import "./globals.css";
import { inter } from '@/app/ui/fonts';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReactNode } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { HomeOutlined, CustomerServiceOutlined, PictureOutlined } from "@ant-design/icons";
import { Content, Footer, Header } from "antd/lib/layout/layout";

const items = [
  {
    "key": '1',
    "icon": <HomeOutlined/>,
    "label": 'Main page'
  },
  {
    "key": '2',
    "icon": <CustomerServiceOutlined/>,
    "label": 'Track list'
  },
  {
    "key": '3',
    "icon": <PictureOutlined/>,
    "label": 'Album list'
  }
];

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} antialiasing`}>
    <AntdRegistry>
      <Layout>
        <Header style={{display: "flex", alignItems: 'center'}}>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            style={{flex: 1, minWidth: 0}}
            mode="horizontal"
            items={items}
          />
        </Header>
        <Content style={{margin: '0 36px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className={"p-6 bg-white rounded-sm min-h-[calc(100vh-187px)]"}>
            {children}
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </AntdRegistry>
    </body>
    </html>
  );
}
