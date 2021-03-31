import React from 'react';

const ProductList = () => {
    return (
        <div className="product" key={this.props.id}>
            {this.props.name}
        </div>
    );
}

export default ProductList
