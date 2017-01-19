import React from 'react'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import ActionGrade from 'material-ui/svg-icons/action/grade'

import './FavButton.css'

export default function FavButton({ color, added, onClick }) {

  return (
    <IconButton tooltip={added ? 'Remove from Favorites' : 'Add to Favorites'} onClick={onClick}>
      {added ? (
        <ActionGrade color="gold" />
      ) : (
        <StarBorder color={color || 'black'} />
      )}
    </IconButton>
  )
}
