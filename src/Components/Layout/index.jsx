import PropTypes from 'prop-types'
const Layout = ({ children, clases }) => {
    Layout.propTypes = {
        children: PropTypes.node.isRequired,
        clases: PropTypes.node.isRequired
    }
    return (
        <div className={clases}>
            {children}
        </div>
    )
}

export { Layout }