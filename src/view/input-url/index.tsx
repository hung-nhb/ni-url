"use client"

// ** Import React
import { useState } from "react"

// ** Import MUI
import { Button, TextField, Box, Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material"

// ** Import Icon
import { Close, ContentCopy } from "@mui/icons-material"

// ** Impoty Thirt Party
import { toast } from "react-toastify"

interface Props {
  shortenDomain?: string
}

const InputUrl = ({ shortenDomain }: Props) => {
  // ** State
  const [data, setData] = useState<{
    origin: string
    shorten: string
  }>({
    origin: "",
    shorten: ""
  })
  const [error, setError] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)

  // ** Handler
  const onSubmit = async () => {
    if (!data.origin || !data.shorten) {
      setError("Fill in all blanks")
      return
    }
    if (data.shorten.length > 30) {
      setError("Custom path must has less than 30 characters")
      return
    }

    const toastId = toast.loading("Waiting...")
    const response = await fetch("/api/url", {
      method: "POST",
      body: JSON.stringify(data)
    })
    const body = await response.json()
    if (body.message === "success") {
      toast.update(toastId, { render: "Done!", type: "success", isLoading: false, autoClose: 3000 })
      setOpen(true)
    }
    else {
      toast.update(toastId, { render: body.message, type: "error", isLoading: false, autoClose: 3000 })
    }

    setError("")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenDomain + "/" + data.shorten)
    toast.info("Copied!")
  }

  const onClose = () => {
    setOpen(false)
    setData({ origin: "", shorten: "" })
  }

  return (
    <Box>
      <TextField
        fullWidth
        margin="normal"
        placeholder="Paste your link"
        value={data.origin}
        onChange={(e) => setData({ ...data, origin: e.target.value })}
        error={Boolean(error && !data.origin)}
      />
      <TextField
        fullWidth
        margin="normal"
        placeholder=" Your custom path"
        InputProps={{
          startAdornment: shortenDomain + "/",
          endAdornment: (
            <Button
              sx={{ display: { xs: "none", md: "inline-flex" } }}
              variant="contained"
              size="large"
              onClick={onSubmit}
            >
              Submit
            </Button>
          ),
        }}
        value={data.shorten}
        onChange={(e) => setData({ ...data, shorten: e.target.value })}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            onSubmit()
          }
        }}
        helperText={error}
        error={Boolean(error && (!data.shorten || data.origin))}
      />
      <Button
        fullWidth
        sx={{ display: { xs: "inline-flex", md: "none" }, my: 2 }}
        variant="contained"
        size="large"
        onClick={onSubmit}
      >
        Submit
      </Button>

      <Dialog open={open} fullWidth maxWidth="xs">
        <DialogTitle
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Your shorten url:
          <IconButton onClick={onClose}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", alignItems: "center" }}>
          <TextField fullWidth value={shortenDomain + "/" + data.shorten} disabled sx={{ mr: 2 }} />
          <IconButton onClick={copyToClipboard}><ContentCopy /></IconButton>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default InputUrl