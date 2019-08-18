
 declare @fi datetime,@meses tinyint=0

set @fi='03/07/2019'
declare @ff datetime,@anio_porcentaje smallint

select  
       @fi = primer_dia_mes_anterior +' 05:00:00' 
	  ,@ff  = fecha_consultada +' 04:59:59'
	from dbo.fechas_monitor(@fi,@meses)

select INV.cod_estab
	  , 'INVENARIO INICIAL' as concepto
	  , upper('INVENARIO INICIAL') AS clasificacion
	  , ISNULL(CLASE.nombre,'Sin identificar')  AS subclasificacion
	  , ISNULL(CATEGORIAS.nombre,'Sin Identificar') AS tipo_movimiento	
	  , SUM(INV.costo_promedio ) as costo 
	  , SUM(INV.costo_promediociva) as importe
from [192.168.2.94].ventas_izagar.dbo.inventario_diario INV WITH(NOLOCK)
    INNER JOIN[192.168.2.94].ventas_izagar.dbo.productos PRODUCTOS WITH(NOLOCK) ON PRODUCTOS.cod_prod=INV.cod_prod  
	LEFT OUTER JOIN [192.168.2.94].ventas_izagar.dbo.clases_productos CLASE ON CLASE.clase_producto = PRODUCTOS.folio_clase_producto
	LEFT OUTER JOIN [192.168.2.94].ventas_izagar.dbo.categorias CATEGORIAS ON CATEGORIAS.categoria = PRODUCTOS.folio_categoria

WHERE INV.fecha  BETWEEN @fi AND @ff and INV.cod_estab not in (7)
GROUP BY INV.cod_estab, CLASE.nombre,CATEGORIAS.nombre

--select top(100)* from [192.168.2.94].ventas_izagar.dbo.inventario_diario order by cod_estab desc


