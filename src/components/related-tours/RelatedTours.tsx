import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'

import { useToursInfinite } from '@/hooks'
import { IRelatedTour, ITour } from '@/types'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Col, Form, Input, Row, Spin } from 'antd'
import clsx from 'clsx'
import { FaTrash } from 'react-icons/fa6'
import SimpleBar from 'simplebar-react'
import { useIntersectionObserver } from 'usehooks-ts'

import styles from './RelatedTours.module.scss'

interface IRelaterToursProps {
  selectedTours: IRelatedTour[]
  setSelectedTours: Dispatch<SetStateAction<IRelatedTour[]>>
}

export const RelatedTours: FC<IRelaterToursProps> = ({ selectedTours, setSelectedTours }) => {
  const { fetchNextPage, hasNextPage, isFetching, tours } = useToursInfinite()

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
  })

  const onTourClick = (tour: ITour) => {
    setSelectedTours(prev => [...prev, tour])
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id === over?.id) {
      return
    }

    setSelectedTours(tours => {
      const oldIndex = tours.findIndex(user => user.id === active.id)
      const newIndex = tours.findIndex(user => user.id === over?.id)

      return arrayMove(tours, oldIndex, newIndex)
    })
  }

  const onDelete = (id: number) => {
    setSelectedTours(prev => prev.filter(tour => tour.id !== id))
  }

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, fetchNextPage])

  return (
    <>
      <Form.Item label={'Title'} name={'related_tours_title'}>
        <Input />
      </Form.Item>

      <Form.Item label={'Tours'} style={{ marginBottom: 0 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Spin spinning={isFetching}>
              <SimpleBar autoHide={false} style={{ height: 352 }}>
                <ul className={styles.list}>
                  {tours?.pages.map((group, i) => (
                    <React.Fragment key={i}>
                      {group.data.data.map(tour => (
                        <li
                          className={clsx(styles.item, {
                            [styles.selected]: selectedTours.find(t => t.id === tour.id),
                          })}
                          key={tour.id}
                          onClick={() => onTourClick(tour)}
                        >
                          <span className={styles.truncate}>{tour.tour_name}</span>
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
                </ul>

                <div ref={ref} />
              </SimpleBar>
            </Spin>
          </Col>

          <Col span={12}>
            <SimpleBar autoHide={false} style={{ height: 352 }}>
              <ul className={styles.list}>
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                  <SortableContext items={selectedTours} strategy={verticalListSortingStrategy}>
                    {selectedTours.map(tour => (
                      <SelectedTour key={tour.id} onDelete={onDelete} tour={tour} />
                    ))}
                  </SortableContext>
                </DndContext>
              </ul>
            </SimpleBar>
          </Col>
        </Row>
      </Form.Item>
    </>
  )
}

interface ISelectedTourProps {
  onDelete: (id: number) => void
  tour: IRelatedTour
}

const SelectedTour: FC<ISelectedTourProps> = ({ onDelete, tour }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: tour.id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      className={clsx(styles.selectedItem, { [styles.isDraging]: isDragging })}
      ref={setNodeRef}
      style={style}
    >
      <span className={styles.moveHolder} {...attributes} {...listeners}>
        <span className={styles.truncate}>{tour.tour_name}</span>
      </span>

      <Button
        danger
        onClick={() => onDelete(tour.id)}
        shape={'circle'}
        size={'small'}
        type={'primary'}
      >
        <FaTrash size={12} />
      </Button>
    </li>
  )
}
