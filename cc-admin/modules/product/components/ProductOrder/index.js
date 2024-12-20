import PropTypes from 'prop-types';
import { Button, Col, InputNumber, List, Row, Select, Typography } from 'antd';
import { useEffect, useState } from "react";

const ProductOrderComponent = ({ data }) => {
  console.log(data);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [detail, setDetail] = useState([])

  const fetchData = async (page, search) => {
    fetch(
      `/api/entities/system/training_product?page=${page}&page_size=10&sort=&keywords=${search}&filters=&fields=`
    ).then(
      (res) => res.json()).then((data) => {
        setProducts(data.rows);
      })
  }

  const handleAddItem = () => {
    const product = products.find((prod) => prod._id === selectedProduct);
    if (product) {
      const newItem = {
        product_id: product._id,
        product_name: product.product_name,
        quantity,
        product_price: product.product_price,
        total: product.product_price * quantity,
      };

      setDetail((prevItems) => [...prevItems, newItem]);
      // setTotalAmount((prevAmount) => prevAmount + newItem.total);
      data.value = detail.push(newItem)
    }
  }

  const onSearch = (value) => {
    fetchData(1, value);
  }

  const onScroll = (e) => {
    console.log(e);
  }

  useEffect(() => {
    fetchData(1, '')
  }, []);

  return (
    <div>
      <Row align="middle" style={{ marginTop: 2 }} gutter={[16]}>
        <Col span={10}>
          <Select
            style={{ width: '100%' }}
            showSearch
            placeholder="Select a product"
            optionFilterProp="label"
            onSearch={onSearch}
            value={selectedProduct}
            onChange={(value) => setSelectedProduct(value)}
          >
            {products.map((row) => <Option key={row.code} value={row._id}>{row.product_name}</Option>)}
          </Select>
        </Col>
        <Col span={10}>
          <InputNumber style={{ width: '100%' }}
            value={quantity}
            onChange={(value) => setQuantity(value)}
          />
        </Col>
        <Col span={4}>
          <Button type="primary"
            onClick={() => handleAddItem()}>
            เพิ่มรายการสินค้า
          </Button>
        </Col>
      </Row>

      <Row gutter={[16]}>
        <Col>
          <List
            style={{ marginTop: 5 }}
            itemLayout="horizontal"
            dataSource={detail}
            renderItem={(item, index) => (
              <List.Item>
                <Typography level={5}> {item.product_name}  ( {item.quantity} )</Typography>
              </List.Item>
            )}
          />
        </Col>

      </Row>

    </div>
  )
}

const _onSave = (field, value) => {
  console.log(field, value);
  return value
}


const SettingProductOrderComponent = ({ schema, relatedSchema }) => {

  return (
    <>
    </>
  )
}

export const onSave = _onSave

export const name = "product_order"

export const label = 'ProductOrder'

export const settings = SettingProductOrderComponent

export const options = {
  field_type: 'string',
  allow_trigger: true,
  allow_filter: true,
  allow_display_permission: true
}

ProductOrderComponent.propsType = {
  data: PropTypes.object,
  disabled: PropTypes.bool,
  schema: PropTypes.object,
  relatedSchema: PropTypes.array
}

SettingProductOrderComponent.propsType = {
  schema: PropTypes.object,
  relatedSchema: PropTypes.array
}

export default ProductOrderComponent