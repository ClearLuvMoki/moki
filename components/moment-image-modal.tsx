import { ExifType } from '@/types';
import { Modal, ModalBody, ModalContent, Image, Divider } from '@heroui/react'
import React from 'react'
import Position from './position';
import { transformExifKey } from '@/utils/tools';

interface Props {
  open: boolean;
  cacheId: string;
  item: {
    base64: string;
    exifInfo: ExifType
  } | null;
  onClose: () => void;
}


const MomentImageModal = ({ open, item, cacheId, onClose }: Props) => {

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size='4xl'
      hideCloseButton={true}
    >
      <ModalContent>
        {() => (
          <ModalBody className='py-8'>
            <div className='w-full flex flex-col justify-center md:flex-col items-center '>
              <Image
                className='w-full h-auto m-auto'
                src={item?.base64}
                alt=""
                isBlurred={true}
              />
              {
                Object.values(item?.exifInfo || {}).map(Boolean).filter(Boolean).length > 0 && (
                  <div className='w-full m-auto mt-4 border rounded-lg p-4 dark:border-zinc-500'>
                    <div className="space-y-1">
                      {
                        item?.exifInfo.latitude && item?.exifInfo.longitude && (
                          <p className="text-small font-medium text-default-400">
                            <Position
                              cacheId={cacheId}
                              latitude={item?.exifInfo.latitude as number}
                              longitude={item?.exifInfo?.longitude as number}
                            />
                          </p>
                        )
                      }
                    </div>
                    <Divider className="my-2" />
                    {
                      <div className="flex flex-wrap items-center text-small dark:text-zinc-400">
                        {
                          Object.keys(item?.exifInfo || {}).filter(item => !["latitude", "longitude", 'date'].includes(item)).map((key, index) => {
                            if (!(item?.exifInfo as any)?.[key] as any) {
                              return null
                            }
                            return (
                              <>
                                <div>{transformExifKey(key)?.title}: {(item?.exifInfo as any)[key]}</div>
                                {index + 1 !== Object.keys(item?.exifInfo || {}).length - 3 && (<Divider orientation="vertical" className='mx-2 h-3' />)}
                              </>
                            )
                          }).filter(Boolean)
                        }
                      </div>
                    }
                  </div>
                )
              }
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}

export default MomentImageModal
