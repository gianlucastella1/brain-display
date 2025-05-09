# brain-display

Query string parameters to toggle cells layers' visibility:

| Parameter | Layers | Cells types |
|--------------||--------------||--------------|
|  io | Inferior Olive | 10 cells |
|  dcn | Deep Cerebellar Nuclei | DCN projecting cells, DCN inhibitory cells |
|  granular | Inferior Olive | Granule cells, Golgi cells, Unipolar brush cells |
|  molecular | Inferior Olive | Purkinje Cell |
|  purkinje |Inferior Olive | Stellate cells, Basket cells |

Allowed values: *false* or *0* to hide, *true* or *1* to show

Default value, if not sepcified: *true*

Example:
```
?io=true&purkinje=false
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
