# brain-display

Query string parameters to toggle specific types' visibility:

| Parameter |
|--------------|
|  basket_cell | 
|  dcn_i |
|  dcn_p |
|  io |
|  glomerulus |
|  golgi_cell |
|  granule_cell |
|  mossy_fibers |
|  purkinje_cell |
|  stellate_cell |
|  ubc_glomerulus |
|  unipolar_brush_cell |

Allowed values: *false* or *0* to hide, *true* or *1* to show

Default value, if not sepcified: *true*

Example: in order to hide granule_cell and purkinje_cell: 
```
?granule_cell=false&purkinje_cell=false
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
