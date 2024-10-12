import $ from 'jquery';
import { bitable, DashboardState, Rollup } from '@lark-base-open/js-sdk';
import './index.scss';
// import './locales/i18n'; // 开启国际化，详情请看README.md


$(async function () {
  const status = bitable.dashboard.state;

  if (status === DashboardState.Config || status === DashboardState.Create) {
    //配置状态.
    config();
    return;
  }
  if (status === DashboardState.View) {
    //仪表盘展示状态
    view();
    return;
  }

  if (status === DashboardState.FullScreen) {
    //仪表盘展示全屏状态
    view();
    return;
  }
});

// 配置状态下相关逻辑
async function config() {
  $('#config_block').show();
  const tableList = await bitable.base.getTableMetaList();
  const optionsHtml = tableList.map(table => {
    return `<option value="${table.id}">${table.name}</option>`;
  }).join('');
  $('#tableSelect').append(optionsHtml).val('');

  /** 从表单获取DataConditions数据源范围和配置。给saveConfig使用，控制getData获取到的数据 */
  const getDataConditions = () => {
    const tableId: string | undefined = $('#tableSelect').val() as any;
    const groups: string | undefined = $('#tableSelect_groups').val() as any;
    const series: string | undefined = $('#tableSelect_series').val() as any;

    if (!tableId || !groups || !series) {
      return;
    }
    return [{
      tableId,
      series: [{// 系列
        fieldId: series,
        rollup: Rollup.SUM
      }],
      groups: [{// 分组信息
        fieldId: groups,
      }]
    }]
  }

  // 展示预览状态的数据
  const showPreviewData = async () => {
    const dataConditions = getDataConditions();
    if (!dataConditions) {
      return;
    }

    const previewData = await bitable.dashboard.getPreviewData(dataConditions);
    console.log('====preivewData', previewData); // 配置状态下可以获取到预览数据。
    showData(previewData);
  }

  // 处理配置时候的预览逻辑
  $('#tableSelect').on('change', async function () {
    console.log('===on change')
    const tableId: string | undefined = $('#tableSelect').val() as any;
    if (!tableId) {
      return;
    }
    const table = await bitable.base.getTableById(tableId);
    const fieldMetaList = await table.getFieldMetaList();

    const fieldOptionsHtml = fieldMetaList.map(f => {
      return `<option value="${f.id}">${f.name}</option>`;
    }).join('');
    // 设置字段选择器的选项
    $('#tableSelect_groups').html(fieldOptionsHtml).val('');
    $('#tableSelect_series').html(fieldOptionsHtml).val('');
  });

  $('#config_form').on('change', async function () {
    showPreviewData();
  })

  // 预览完成后保存配置
  $('#save_btn').on('click', async function () {
    const dataConditions = getDataConditions();

    if (!dataConditions) {
      alert('请选择数据源');
      return;
    }
    // 保存配置.
    await bitable.dashboard.saveConfig({
      dataConditions,
      customConfig: {
        aa: Math.random(),//保存一些自定义配置项
      }
    })
  });
}

async function view() {
  $('#view_block').show();
  // 上一次通过saveConfig保存的数据
  const config = await bitable.dashboard.getConfig();
  const showDataOnChange = async () => {
    const data = await bitable.dashboard.getData();//拿到dataConditions数据源的数据
    console.log('===config,data', {
      config,
      data,
    });
    // 一些数据处理逻辑...
    showData(data);
  }
  showDataOnChange();

  bitable.dashboard.onConfigChange(async () => {
    console.log('===view 配置改变')
    showDataOnChange();
  })

  bitable.dashboard.onDataChange(async () => {
    showDataOnChange();
  })
}

function showData(data: object) {

  $('#view_block_data').text(JSON.stringify(data, null, '  '));

}