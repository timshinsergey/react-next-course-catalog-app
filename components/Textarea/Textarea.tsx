import cn from 'classnames'
import { TextareaProps } from './Textarea.props'
import styles from './Textarea.module.css'

export const Textarea = ({
  className,
  ...props
}: TextareaProps): JSX.Element => {
  return (
    <div className={cn(className, styles.textareaWrapper)}>
      <textarea className={cn(styles.textarea)} {...props} />
    </div>
  )
}
