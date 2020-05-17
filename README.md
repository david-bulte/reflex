# Reflex

Simple Angular directive to assign flex values to child components. Medidative demo 
[here](https://david-bulte.github.io/reflex/). Work in progress.

## How to use it?

Simply set the [reflex] directive on a container element, thereby passing a 
dash-separated string that specifies flex values for each child.

For example, the following

```
<div [reflex]="'3-2-1'">
    <div>dance</div>
    <div>dance</div>
    <div>dance</div>
</div>
```
will result in 
```
<div style="display:flex">
    <div style="flex:3">dance</div>
    <div style="flex:2">dance</div>
    <div style="flex:1">dance</div>
</div>
```

Spaces are also supported. Specify a series of zeroes, where 1 zero corresponds
 with 1 flex value. For example:
```
<div [reflex]="'3-2-1-0000-2'">
    <div>dance</div>
    <div>dance</div>
    <div>dance</div>
    <div>to the radio</div>
</div>
```
results in 
```
<div style="display:flex">
    <div style="flex:3">dance</div>
    <div style="flex:2">dance</div>
    <div style="flex:1">dance</div>
    <div style="flex:4"></div>
    <div style="flex:1">to the radio</div>
</div>
```

Some might not find this approach so intuitive. You can of course provide 
an empty div yourself, and adapt the reflex expression, like so:

```
<div [reflex]="'3-2-1-4-2'">
    <div>dance</div>
    <div>dance</div>
    <div>dance</div>
    <div><div>
    <div>to the radio</div>
</div>
```

Use this approach in the rare case you want to change the reflex epression 
at runtime. See the [demo app](https://david-bulte.github.io/reflex/) for an example.
