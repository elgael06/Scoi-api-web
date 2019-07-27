
declare  @fi datetime,@meses tinyint=0
set @fi='23/07/2019'

set nocount on
declare @ff datetime,@anio_porcentaje smallint

select  
       @fi = primer_dia_mes_anterior
	  ,@ff  = fecha_consultada+' 23:59:59'
	 --set @anio_porcentaje=datepart(year,@fi)
	from dbo.fechas_monitor(@fi,@meses)
	
SELECT PEDIDO.cod_estab_alterno
	  , ESTAB.establecimiento
	  , 'RECEPCIONES' as concepto
	  , 'RECEPCIONES DE OTROS ESTABLECIMIENTOS' AS clasificacion
	  , ISNULL(CLASE.nombre,'Sin identificar')  AS subclasificacion
	  , ISNULL(CATEGORIAS.nombre,'Sin Identificar') AS tipo_movimiento	
	  , DATEPART(WEEK ,PEDIDO.fecha_entrega) AS semana_del_año
	  , DATENAME(MONTH ,PEDIDO.fecha_entrega) AS mes
	  , DATEPART(YEAR ,PEDIDO.fecha_entrega) AS anio   
	  , SUM(MPED.costo ) costo
	  , SUM(MPED.importe) importe	
	  , SUM(MPED.total) importe_sin_iva

FROM [BMSIZAGAR].dbo.pedestab PEDIDO WITH(NOLOCK)
	LEFT JOIN tb_establecimientosBMS_por_servidor ESTAB ON ESTAB.folio = PEDIDO.cod_estab_alterno
	LEFT JOIN [BMSIZAGAR].dbo.mpedestab MPED ON MPED.folio = PEDIDO.folio AND MPED.status='V'
    INNER JOIN [192.168.2.94].ventas_izagar.dbo.productos PRODUCTOS WITH(NOLOCK) ON PRODUCTOS.cod_prod=MPED.cod_prod  
	LEFT OUTER JOIN [192.168.2.94].ventas_izagar.dbo.clases_productos CLASE ON CLASE.clase_producto = PRODUCTOS.folio_clase_producto
	LEFT OUTER JOIN [192.168.2.94].ventas_izagar.dbo.categorias CATEGORIAS ON CATEGORIAS.categoria = PRODUCTOS.folio_categoria

WHERE fecha_entrega BETWEEN @fi AND @ff AND PEDIDO.cod_estab_alterno  not in (7) AND PEDIDO.status_surtido ='T'

GROUP BY PEDIDO.cod_estab_alterno,ESTAB.establecimiento,CLASE.nombre,CATEGORIAS.nombre,PEDIDO.fecha_entrega
ORDER BY estab.establecimiento, pedido.fecha_entrega


--select top(100)* from [192.168.2.94].ventas_izagar.dbo.productos

--select * from [192.168.2.94].ventas_izagar.dbo.categorias