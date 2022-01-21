import cn from 'classnames'
import { InputProps } from './Input.props'
import styles from './Input.module.css'

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
  return (
    <div className={cn(className, styles.inputWrapper)}>
      <input className={cn(styles.input)} {...props} />
    </div>
  )
}
