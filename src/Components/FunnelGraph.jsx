import { ResponsiveFunnel } from '@nivo/funnel'

const data = [
    {
      "id": "step_sent",
      "value": 91831,
      "label": "Sent"
    },
    {
      "id": "step_viewed",
      "value": 66879,
      "label": "Viewed"
    },
    {
      "id": "step_clicked",
      "value": 53011,
      "label": "Clicked"
    },
    {
      "id": "step_add_to_card",
      "value": 35981,
      "label": "Add To Card"
    },
    {
      "id": "step_purchased",
      "value": 24910,
      "label": "Purchased"
    }
  ]

const FunnelGraph = ({ title }) => (
    <div className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-4 w-full">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div style={{ height: '400px', width: '100%' }}>
    <ResponsiveFunnel 
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.4s"
        colors={{ scheme: 'spectral' }}
        borderWidth={20}
        labelColor={{ from: 'color', modifiers: [['darker', 3]] }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
    />
    </div>
    </div>
)

export default FunnelGraph;