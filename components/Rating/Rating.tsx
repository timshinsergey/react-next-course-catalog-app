import {
  useState,
  useEffect,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
} from 'react'
import cn from 'classnames'
import { RatingProps } from './Rating.props'
import styles from './Rating.module.css'
import StarIcon from './star.svg'

export const Rating = forwardRef(
  (
    { isEditable = false, rating, setRating, error, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    )

    useEffect(() => {
      constructRating(rating)
    }, [rating])

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            key={i}
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                isEditable && handleSpace(i + 1, e)
              }
            />
          </span>
        )
      })
      setRatingArray(updatedArray)
    }
    const changeDisplay = (rating: number) => {
      if (!isEditable) {
        return
      }
      constructRating(rating)
    }
    const onClick = (rating: number) => {
      if (!isEditable || !setRating) {
        return
      }
      setRating(rating)
    }
    const handleSpace = (rating: number, event: KeyboardEvent<SVGElement>) => {
      if (event.code !== 'Space' || !setRating) {
        return
      }
      setRating(rating)
    }

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role='alert' className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)

Rating.displayName = 'Rating'
